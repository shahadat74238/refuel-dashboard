/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../redux/services/chatApis";

export const ChatWindow = ({
  activeChatId,
  currentUserId,
  activeRecipient,
}: any) => {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Fetch messages
  const { data: messagesResponse, isFetching } = useGetMessagesQuery(
    { chatId: activeChatId, page, limit: 10 },
    { skip: !activeChatId },
  );
  const [sendMsgApi] = useSendMessageMutation();

  // Correct path based on your JSON
  const meta = messagesResponse?.meta;
  const rawMessages = messagesResponse?.data || [];

  // 2. UI order: Oldest at the top, Newest at the bottom
  const displayMessages = useMemo(
    () => [...rawMessages].reverse(),
    [rawMessages],
  );

  // Reset states when switching chats
  useEffect(() => {
    setPage(1);
    setIsInitialLoad(true);
  }, [activeChatId]);

  // 3. EFFECT: Initial Scroll to Bottom
  useEffect(() => {
    if (scrollRef.current && isInitialLoad && displayMessages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsInitialLoad(false);
    }
  }, [displayMessages, isInitialLoad]);

  // 4. EFFECT: Infinite Scroll Logic (Bottom to Top)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (
      !topObserverRef.current ||
      !meta ||
      page >= meta.totalPages ||
      !scrollContainer
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        // threshold 0.1 is more reliable for triggering when the top is reached
        if (entries[0].isIntersecting && !isFetching && !isInitialLoad) {
          const previousScrollHeight = scrollContainer.scrollHeight;
          const previousScrollTop = scrollContainer.scrollTop;

          setPage((prev) => prev + 1);

          // Restore scroll position after new data is prepended to prevent "jumping"
          const MutationObserverCallback = () => {
            const newScrollHeight = scrollContainer.scrollHeight;
            scrollContainer.scrollTop =
              newScrollHeight - previousScrollHeight + previousScrollTop;
            mObserver.disconnect();
          };

          const mObserver = new MutationObserver(MutationObserverCallback);
          mObserver.observe(scrollContainer, { childList: true });
        }
      },
      {
        root: scrollContainer, // Explicitly set the scroll container as root
        threshold: 0.1,
      },
    );

    observer.observe(topObserverRef.current);
    return () => observer.disconnect();
  }, [isFetching, meta, page, isInitialLoad]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeChatId) return;
    try {
      await sendMsgApi({ chat_id: activeChatId, content: inputValue }).unwrap();
      setInputValue("");
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  if (!activeChatId)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4  flex items-center gap-4 bg-white z-10 shadow-sm">
        <img
          src={activeRecipient?.profile_picture || "https://i.pravatar.cc/150"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-800">
            {activeRecipient?.full_name}
          </h4>
          <p className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC] custom-scrollbar flex flex-col"
      >
        {/* 🔥 Push messages to the bottom if there aren't many */}
        <div className="flex-1" />

        {/* 🔥 Top Sentinel */}
        <div
          ref={topObserverRef}
          className="h-10 flex justify-center items-center w-full"
        >
          {isFetching && page > 1 && (
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <div className="w-3 h-3 border-gray-300  rounded-full animate-spin"></div>
              Loading history...
            </div>
          )}
        </div>

        <div className="space-y-6 ">
          {displayMessages.map((msg: any) => {
            const isMe =
              msg.sender_role === "ADMIN" || msg.sender_role === "SUPER_ADMIN";
            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-3`}
              >
                <div
                  className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-3.5 text-[14px] shadow-sm rounded-[18px] ${
                      isMe
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white text-gray-700 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white  flex items-center gap-4  border-t border-gray-300">
        <div className="flex-1 relative">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full bg-gray-50 border border-primary rounded-full py-3.5 pl-6 pr-12 outline-none focus:border-primary"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
            <FiPaperclip size={18} />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          className="bg-primary text-white p-4 rounded-full shadow-lg cursor-pointer"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};
