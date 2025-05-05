import { useNovelStore } from "@/store/novel";
import NovelEditor from "./components/novel-editor";
import { useEffect, useMemo } from "react";
import NovelCreator from "./components/novel.creator";

const NovelPage = () => {
  const { novels, novelId, setNovelId } = useNovelStore();
  const currentNovel = useMemo(() => {
    return novels.find(novel => novel.id === novelId)
  }, [novels, novelId]);

  useEffect(() => {
    return () => {
      setNovelId(''); // 页面卸载时重置
    }
  }, [])
  return (
    <div className="h-full relative flex flex-col transition-all">
      {
        novelId ? <NovelEditor content={currentNovel?.content} /> :
          <NovelCreator />
      }

    </div>
  );
};

export default NovelPage;
