import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

export type Novel = {
    content: string;
    title: string;
    id: string;
    createTime?: number;
    updateTime?: number;
    assistantId?: string; // 关联到 chat
}

interface NovelStore {
    novelId?: string;
    setNovelId: (val: string) => void;

    novels: Novel[];
    createNovel: (novel: Partial<Novel> & Pick<Novel, 'content' | 'title' | 'id'>) => void;
    updateNovel: (id: string, content: string) => void;
    getCurrentNovel: () => Novel | undefined;
}


export const useNovelStore = create<NovelStore>()(
    devtools(
        persist(
            immer(
                (set, get) => ({
                    novelId: '',
                    novels: [{
                        id: '1',
                        title: 'hello hello worldhello worldorld.md',
                        content: 'hello world',
                        assistantId: '0'
                    },
                    {
                        id: '2',
                        title: '你好你好你啊后',
                        content: 'hello world 1234',
                        assistantId: '0'
                    }],
                    getCurrentNovel() {
                        return get().novels.find(item => item.id === get().novelId)
                    },
                    createNovel(novel) {
                        set(state => {
                            const now = Date.now();
                            state.novels.push({ ...novel, createTime: now, updateTime: now });
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
            ), { name: 'position-storage' }), { name: "novel-store" })
)
