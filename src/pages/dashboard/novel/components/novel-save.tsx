import { IconSizeXS } from "@/constants";
import { useNovelStore } from "@/store/novel";
import { FloppyDisk } from "@phosphor-icons/react";
import { Editor, useCurrentEditor } from "@tiptap/react";
import { debounce } from "lodash-es";
import { FC, memo, useCallback, useEffect } from "react";

export const SaveNovelButton: FC<{ onSave: (editor: Editor) => void }> = memo(({ onSave }) => {
    const { editor } = useCurrentEditor();
    return <FloppyDisk className="text-gray-500 hover:text-green-500 cursor-pointer"
        size={IconSizeXS} onClick={() => {
            onSave(editor!)
        }} />
})


export const AutoSave = memo(() => {
    const { updateNovel, novelId } = useNovelStore()
    const { editor } = useCurrentEditor();

    const handleSave = useCallback(debounce((editor) => {
        const md = editor!.storage.markdown.getMarkdown();
        updateNovel(novelId!, md)
    }, 3000), [updateNovel, novelId]);


    useEffect(() => {
        editor?.on('update', ({ editor }) => {
            handleSave(editor)
        })
        editor?.on('blur', ({ editor }) => {
            const md = editor!.storage.markdown.getMarkdown();
            updateNovel(novelId!, md)
        })
        return () => {
            editor?.off('update');
            editor?.off('blur');
        }
    }, [editor])
    return <>
    </>
})
function NovelSave() {
    return <>
        <AutoSave />
    </>
}

export default memo(NovelSave)