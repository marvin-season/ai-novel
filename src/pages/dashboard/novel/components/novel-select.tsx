import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconSizeSmall } from "@/constants";
import { useNovelStore } from "@/store/novel";
import { CaretLeft, FloppyDisk, Trash } from "@phosphor-icons/react";
import { useCurrentEditor } from "@tiptap/react";
import { toast } from "sonner";

export default function NovelInfo() {
  const { setNovelId, novelId, getCurrentNovel, updateNovel, deleteNovel } = useNovelStore();

  const { editor } = useCurrentEditor();

  return (
    <div className="mr-auto h-full flex gap-2 items-center">
      <Button
        size="sm"
        variant={"ghost"}
        onClick={() => {
          editor?.destroy();
          setNovelId("");
        }}
      >
        <CaretLeft size={IconSizeSmall} />
      </Button>
      <span className="mx-2 text-sm w-[100px] text-gray-600 truncate">
        {getCurrentNovel()?.title}
      </span>
      <Separator orientation="vertical" />
      {novelId && (
        <>
          <Button
            size="sm"
            variant={"ghost"}
            onClick={() => {
              const md = editor?.storage.markdown.getMarkdown();
              if (md) {
                updateNovel(novelId, md);
                toast.success(`保存成功`);
              }
            }}
          >
            <FloppyDisk size={IconSizeSmall} />
          </Button>
          <Button
            className="text-red-500 hover:text-red-600"
            size="sm"
            variant={"ghost"}
            onClick={() => {
              const ok = confirm(
                "确定删除该文稿？文稿删除后无法恢复，请谨慎操作！",
              );
              if(ok) {
                deleteNovel(novelId)
                toast.success(`删除成功`);
              }
            }}
          >
            <Trash size={IconSizeSmall} />
          </Button>
        </>
      )}

    </div>
  );
}
