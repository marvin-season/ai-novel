import { useNovelStore } from "@/store/novel";
import NovelEditor from "./components/novel-editor";
import { useMemo } from "react";

const NovelPage = () => {
  const {novels, novelId} = useNovelStore();
  const currentNovel = useMemo(() => {
    return novels.find(novel => novel.id === novelId)
  }, [novels, novelId]);
  return (
    <div className="h-full relative flex flex-col transition-all">
      <NovelEditor content={currentNovel?.content} />
    </div>
  );
};

export default NovelPage;
