import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
interface NovelStore {
    novelId?: string;
    setNovelId: (val: string) => void;
}
export const useNovelStore = create<NovelStore>()(
    devtools(
        immer(
            (set) => ({
                novelId: '',
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
