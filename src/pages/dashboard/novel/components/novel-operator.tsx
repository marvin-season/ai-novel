import Description from "@/components/description";
import { CHAR_LIMIT, IconSizeXS } from "@/constants";
import { useNovelStore } from "@/store/novel";
import { useCurrentEditor } from "@tiptap/react";
import { Trash2 } from "lucide-react";
import { memo, useMemo } from "react";
import { toast } from "sonner";
import NovelSave from "./novel-save";


export default function NovelOperator() {
    const { editor } = useCurrentEditor();
    const getCurrentNovel = useNovelStore(state => state.getCurrentNovel)
    const updateTime = useMemo(() => {
        const time = getCurrentNovel()?.updateTime || Date.now();
        return '上次修改时间 ' + new Date(time).toLocaleString()
    }, [getCurrentNovel])
    return (
        <div className="py-2 pl-4 flex gap-6 items-center border-t">
            <div className="flex items-center gap-4">
                <DeleteNovel />
                <NovelSave />

            </div>
            <div className="flex items-center gap-2">
                <Description content={'count: ' + editor!.storage.characterCount.characters() + `/ ${CHAR_LIMIT}`} />
                <Description content={'words: ' + editor!.storage.characterCount.words()} />
                <Description content={updateTime} />
            </div>
        </div >
    )
}


const DeleteNovel = memo(() => {
    const novelId = useNovelStore(state => state.novelId)
    const deleteNovel = useNovelStore(state => state.deleteNovel)
    return <Trash2 className="text-gray-500 cursor-pointer hover:text-red-600"
        size={IconSizeXS}
        onClick={() => {
            const ok = confirm(
                "确定删除该文稿？文稿删除后无法恢复，请谨慎操作！",
            );
            if (ok) {
                deleteNovel(novelId!)
                toast.success(`删除成功`);
            }
        }} />
})