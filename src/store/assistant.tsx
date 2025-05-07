import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { NovelStore } from "./novel";
import { AgentState } from "./agent";

interface ConversationProps {
  id: string;
  title: string;

  novelId: NovelStore["novelId"]; // associate to novel
  messages: AgentState['messages'];
  createTime: number;
  updateTime: number;

}

export interface AssistantStoreProps {
  conversations: ConversationProps[]
  // crud
  createConversation: (conversation: Partial<ConversationProps> & Pick<ConversationProps, 'novelId' | 'id'>) => void;
  updateConversation: (id: string, conversation: Partial<ConversationProps>) => void;
  deleteConversation: (id: string) => void;
  getConversation: (id: string) => ConversationProps | undefined;
}

const useAssistantStore = create<AssistantStoreProps>()(
  devtools(
    persist(
      immer((set, get) => ({
        conversations: [],
        // curd impl
        createConversation: (conversation) => {
          set((state) => {
            state.conversations.push({
              ...conversation,
              updateTime: Date.now(),
              createTime: Date.now(),
              title: conversation.title || "Untitled",
              messages: [],
            });
          });
        },
        deleteConversation: (id: string) => {
          set((state) => {
            const index = state.conversations.findIndex(
              (conversation) => conversation.id === id,
            );
            if (index !== -1) {
              state.conversations.splice(index, 1);
            }
          });
        },
        getConversation: (id) => {
          return get().conversations.find((item) => item.id === id);
        },
        updateConversation: (id, conversation) => {
          set((state) => {
            const index = state.conversations.findIndex(
              (conversation) => conversation.id === id,
            );
            if (index !== -1) {
              state.conversations[index] = {
                ...state.conversations[index],
                ...conversation,
              }
            }
          })
        }
      })),
      {
        name: "conversationStorage",
      }), {
    name: "conversationStore",
  }),
);

export default useAssistantStore;
