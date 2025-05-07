import Description from "@/components/description";
import { IconSizeSmall, IconSizeXS } from "@/constants";
import { useNovelStore } from "@/store/novel";
import { FloppyDisk } from "@phosphor-icons/react";
import { useCurrentEditor } from "@tiptap/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function NovelOperator() {
    const { novelId, updateNovel, deleteNovel } = useNovelStore();

    const { editor } = useCurrentEditor();
    return (
        <div className="py-2 pl-4 flex gap-6 items-center border-t">
            <div className="flex gap-4">
                <Trash2 className="cursor-pointer hover:text-red-600"
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
                <FloppyDisk className="cursor-pointer" size={IconSizeXS} onClick={() => {
                    const md = editor?.storage.markdown.getMarkdown();
                    if (md) {
                        updateNovel(novelId!, md);
                        toast.success(`保存成功`);
                    }
                }} />

            </div>
            <Description content="自动保存" />
        </div >
    )
}
