import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { ConversationProps } from "./assistant";

export type Novel = {
  content: string;
  title: string;
  id: string;
  createTime?: number;
  updateTime?: number;
};

export interface NovelStore {
  novelId?: string;
  setNovelId: (val: string) => void;
  conversationId?: ConversationProps['id']; // novel只绑定一个 conversation
  setConversationId: (val: string) => void;
  ebableAutoSave: boolean;
  setEbableAutoSave: (val: boolean) => void;

  novels: Novel[];
  createNovel: (
    novel: Partial<Novel> & Pick<Novel, "content" | "title" | "id">,
  ) => void;
  updateNovel: (id: string, content: string) => void;

  deleteNovel: (id: string) => void;
  getCurrentNovel: () => Novel | undefined;
}

export const useNovelStore = create<NovelStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        novelId: "",
        novels: [
          {
            id: "1",
            title: "quick start",
            content: "Amzing!",
            updateTime: Date.now(),
            createTime: Date.now(),
          },
        ],
        ebableAutoSave: true,
        setConversationId(id) {
          set((state) => {
            state.conversationId = id;
          });
        },
        setEbableAutoSave(val) {
          set((state) => {
            state.ebableAutoSave = val;
          });
        },
        getCurrentNovel() {
          return get().novels.find((item) => item.id === get().novelId);
        },
        createNovel(novel) {
          set((state) => {
            const now = Date.now();
            state.novels.push({ ...novel, createTime: now, updateTime: now });
          });
        },
        updateNovel(id, content) {
          set((state) => {
            const novel = state.novels.find((novel) => novel.id === id);
            if (novel && content != novel.content) {
              novel.content = content;
              novel.updateTime = Date.now();
            }
          });
        },
        deleteNovel(id){
          set((state) => {
            const index = state.novels.findIndex((novel) => novel.id === id);
            if (index !== -1) {
              state.novels.splice(index, 1);
              state.novelId = ''
            }
          });
        },
        setNovelId: (val: string) => {
          set((state) => {
            state.novelId = val;
          });
        },
      })),
      { name: "novel-storage" },
    ),
    { name: "novel-store" },
  ),
);
