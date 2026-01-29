/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import {
  useGetMyChatsQuery,
  useMarkAsReadMutation,
} from "../../redux/services/chatApis";
import { ChatSidebar } from "../../Components/SupportChat/ChatSidebar";
import { ChatWindow } from "../../Components/SupportChat/ChatWindow";

function SupportChat() {
  const token = Cookies.get("accessToken") || Cookies.get("resetToken");
  const currentUserId = token ? (jwtDecode(token) as any)?.user_id : null;

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data: chatsResponse, isFetching } = useGetMyChatsQuery({
    searchTerm,
    page,
    limit: 15,
  });

  const [markAsRead] = useMarkAsReadMutation();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Reset page to 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const chats = chatsResponse?.data?.data || [];
  const meta = chatsResponse?.data?.meta;

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    markAsRead(id);
  };

  const activeChat = chats.find((c: any) => c._id === activeChatId);
  const activeRecipient = activeChat
    ? activeChat.participants.find((p: any) => p._id !== currentUserId) ||
      activeChat.participants[0]
    : null;

  return (
    <PageLayout title="Support Chat">
      <PageContent>
        <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
          <ChatSidebar
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            isLoading={isFetching}
            currentUserId={currentUserId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hasMore={meta ? page < meta.totalPages : false}
            onLoadMore={() => setPage((prev) => prev + 1)}
          />
          <ChatWindow
            activeChatId={activeChatId}
            currentUserId={currentUserId}
            activeRecipient={activeRecipient}
          />
        </div>
      </PageContent>
    </PageLayout>
  );
}

export default SupportChat;
