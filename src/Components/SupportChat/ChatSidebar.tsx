/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

interface ChatSidebarProps {
  chats: any[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  isLoading: boolean;
  currentUserId: string;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const ChatSidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  isLoading,
  currentUserId,
  searchTerm,
  setSearchTerm,
  hasMore,
  onLoadMore,
}: ChatSidebarProps) => {
  const [localInput, setLocalInput] = useState(searchTerm);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 1. Debounce Search logic
  useEffect(() => {
    const handler = setTimeout(() => setSearchTerm(localInput), 500);
    return () => clearTimeout(handler);
  }, [localInput, setSearchTerm]);

  // 2. Infinite Scroll Observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, onLoadMore]);

  // 3. Helper to get the name/image of the person you are talking to
  const getOtherParticipant = (chat: any) => {
    if (!chat.participants) return null;
    return (
      chat.participants.find(
        (p: any) => String(p._id) !== String(currentUserId),
      ) || chat.participants[0]
    );
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-[350px] border-r border-gray-100 flex flex-col bg-[#FDFDFF] h-full">
      {/* Search Header */}
      <div className="p-6">
        <div className="relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2B658A] transition-colors" />
          <input
            type="text"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Search chats..."
            className="w-full bg-[#E9EDF1] rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:ring-2 focus:ring-[#2B658A]/20 transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 custom-scrollbar">
        {chats.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No chats found
          </div>
        )}

        {chats.map((chat: any) => {
          const otherUser = getOtherParticipant(chat);
          const isActive = activeChatId === chat._id;
          const unreadCount = Number(chat.unread_count) || 0;
          const hasUnread = unreadCount > 0;

          console.log(hasUnread,unreadCount, "unread message count" );

          return (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat._id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-[#2B658A] text-white shadow-lg translate-x-1"
                  : "hover:bg-gray-100 text-gray-700 active:scale-95"
              }`}
            >
              {/* Avatar Section */}
              <div className="relative flex-shrink-0">
                <img
                  src={
                    otherUser?.profile_picture ||
                    "https://i.pravatar.cc/150?u=fallback"
                  }
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                {otherUser?.is_online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Text Section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-bold text-[13px] truncate">
                    {otherUser?.full_name || "Unknown User"}
                  </h4>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {otherUser?.role}
                  </span>
                </div>
                <p
                  className={`text-xs truncate transition-colors ${
                    isActive
                      ? "text-white/80"
                      : hasUnread
                        ? "text-gray-900 font-bold"
                        : "text-gray-400"
                  }`}
                >
                  {chat.last_message || "No messages yet"}
                </p>
              </div>

              {/* Meta Section (Time & Unread Count) */}
              <div className="flex flex-col items-end justify-between self-stretch py-1">
                <span
                  className={`text-[10px] whitespace-nowrap ${
                    isActive ? "text-white/70" : "text-gray-400"
                  }`}
                >
                  {formatTime(chat.last_message_at)}
                </span>

                {hasUnread && (
                  <div
                    className={`
                      flex items-center justify-center 
                      text-[10px] font-bold h-5 min-w-[20px] px-1.5 
                      rounded-full shadow-sm transform scale-100 transition-transform
                      ${
                        isActive
                          ? "bg-white text-[#2B658A]"
                          : "bg-[#FF4D4F] text-white animate-pulse"
                      }
                    `}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Sentinel for Infinite Scroll */}
        <div
          ref={loadMoreRef}
          className="h-10 flex items-center justify-center pt-2"
        >
          {isLoading && (
            <div className="flex items-center gap-2 text-[10px] text-gray-400 animate-pulse">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <span>Loading more...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
