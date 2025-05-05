import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type Novel = {
    content: string;
    id: string;
    createTime?: number;
    updateTime?: number;
    assistantId: string; // 关联到 chat
}

interface NovelStore {
    novelId?: string;
    setNovelId: (val: string) => void;

    novels: Novel[];
    getCurrentNovel: (id: string) => Novel | undefined;
    createNovel: (novel: Novel) => void;
    updateNovel: (id: string, content: string) => void;
}


export const useNovelStore = create<NovelStore>()(
    devtools(
        immer(
            (set, get) => ({
                novelId: '',
                novels: [],

                getCurrentNovel(id: string) {
                    return get().novels.find((novel) => novel.id === id)
                },
                createNovel(novel) {
                    set(state => {
                        const now = Date.now();
                        state.novels.push({...novel, createTime: now, updateTime: now});
                    })
                },
                updateNovel(id, content) {
                    set(state => {
                        const novel = state.novels.find(novel => novel.id === id)
                        if (novel) {
                            novel.content = content;
                            novel.updateTime = Date.now();
                        }
                    })
                },
                setNovelId: (val: string) => {
                    set(state => {
                        state.novelId = val
                    })
                }

            })
        ), {
        name: "novel-store"
    })
)
