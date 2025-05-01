import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
export interface DocStoreProps {
    content: string,
    setContent: (content: string) => void

    getChunks: (regx?: RegExp) => string[];
}

const useDocStore = create<DocStoreProps>()(
    devtools(
        immer((set, get) => ({
            content: '',
            setContent(content) {
                set((state) => {
                    state.content = content
                })
            },

            getChunks(regx = /([.!\s])/) {
                const { content } = get();
                return content.split(regx)
            },
        })),
        {
            name: 'docStore'
        })
)

export default useDocStore
