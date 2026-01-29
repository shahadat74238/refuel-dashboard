/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket, connectSocket } from "../../socket";
import baseApis from "../baseApis";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Interfaces based on your JSON
interface IChat {
  _id: string;
  participants: any[];
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

interface IChatResponse {
  success: boolean;
  message: string;
  data: {
    meta: { total: number; page: number; limit: number; totalPages: number };
    data: IChat[];
  };
}

interface IMessageResponse {
  success: boolean;
  message: string;
  meta: { total: number; page: number; limit: number; totalPages: number };
  data: any[];
}

const getCurrentUserId = () => {
  const token = Cookies.get("accessToken") || Cookies.get("resetToken");
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.user_id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const chatApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMyChats: builder.query<IChatResponse, any>({
      query: (params) => ({
        url: "/api/v1/chat/my-chats",
        params,
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.searchTerm || ""}`;
      },
      merge: (currentCache, newItems) => {
        if (newItems.data.meta.page === 1) return newItems;
        // Path: data.data
        currentCache.data.data.push(...newItems.data.data);
        currentCache.data.meta = newItems.data.meta;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: ["chat"],

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          connectSocket();
          const currentUserId = getCurrentUserId();

          socket.on("update_chat_list", (data: any) => {
            updateCachedData((draft) => {
              // 1. Correct Path to your data based on your JSON
              const chatList = draft?.data?.data;

              if (chatList) {
                // 2. Find the chat. Use .toString() to be safe with IDs
                const chatIndex = chatList.findIndex(
                  (c: any) => c._id.toString() === data.chat_id.toString(),
                );

                if (chatIndex !== -1) {
                  const chat = chatList[chatIndex];
                  chat.last_message = data.last_message;
                  chat.last_message_at = data.last_message_at;

                  /**
                   * 3. CRITICAL: Check if the message is from someone else.
                   * We use String() to ensure we aren't comparing a string to an object.
                   */
                  const isNotMe =
                    String(data.sender_id) !== String(currentUserId);

                  if (isNotMe) {
                    chat.unread_count = (chat.unread_count || 0) + 1;
                  }

                  // 4. Move to top of list
                  const [movedChat] = chatList.splice(chatIndex, 1);
                  chatList.unshift(movedChat);
                }
              }
            });
          });
        } catch {
          await cacheEntryRemoved;
          socket.off("update_chat_list");
        }
      },
    }),

    getMessages: builder.query<IMessageResponse, any>({
      query: ({ chatId, page = 1, limit = 20 }) => ({
        url: `/api/v1/chat/messages/${chatId}`,
        params: { page, limit },
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.chatId}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        // Path: data
        currentCache.data.push(...newItems.data);
        currentCache.meta = newItems.meta;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: (result, error, { chatId }) => [
        { type: "message" as const, id: chatId },
      ],

      async onCacheEntryAdded(
        { chatId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          connectSocket();
          socket.emit("join_chat", chatId);

          socket.on("new_message", (msg: any) => {
            updateCachedData((draft) => {
              if (msg.chat_id === chatId) {
                // Path: draft.data
                if (!draft.data.some((m) => m._id === msg._id)) {
                  draft.data.unshift(msg);
                }
              }
            });
          });
        } catch {
          await cacheEntryRemoved;
          socket.off("new_message");
        }
      },
    }),

    sendMessage: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/api/v1/chat/send",
        method: "POST",
        body: payload,
      }),
    }),

    markAsRead: builder.mutation<any, string>({
      query: (chatId) => ({
        url: `/api/v1/chat/mark-as-read/${chatId}`,
        method: "PATCH",
      }),
      async onQueryStarted(chatId, { dispatch, queryFulfilled }) {
        // Optimistic update for the sidebar unread count
        const patchResult = dispatch(
          chatApi.util.updateQueryData(
            "getMyChats",
            { searchTerm: "", page: 1, limit: 20 } as any,
            (draft) => {
              const chat = draft?.data?.data?.find(
                (c: any) => c._id === chatId,
              );
              if (chat) chat.unread_count = 0;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMyChatsQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = chatApi;
