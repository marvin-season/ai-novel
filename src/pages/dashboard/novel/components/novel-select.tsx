import { Button } from "@/components/ui/button";
import { IconSizeSmall } from "@/constants";
import { useNovelStore } from "@/store/novel";
import { CaretLeft } from "@phosphor-icons/react";
import { useCurrentEditor } from "@tiptap/react";
import { useMemo } from "react";

export default function NovelInfo() {
  const { setNovelId, getCurrentNovel } = useNovelStore();

  const { editor } = useCurrentEditor();
  const title = useMemo(() => {
    return getCurrentNovel()?.title
  }, [getCurrentNovel])

  const ReturnButton = useMemo(() => {
    return <Button
      size="sm"
      variant={"ghost"}
      onClick={() => {
        editor?.destroy();
        setNovelId("");
      }}
    >
      <CaretLeft size={IconSizeSmall} />
    </Button>
  }, [setNovelId, editor])

  return (
    <div className="mr-auto h-full flex gap-2 items-center">
      {ReturnButton}
      <span className="mx-2 text-sm w-[100px] text-gray-600 truncate">
        {title}
      </span>
    </div>
  );
}
