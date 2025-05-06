import { useNovelStore } from "@/store/novel";
import NovelEditor from "./components/novel-editor";
import { useEffect, useMemo } from "react";
import NovelCreator from "./components/novel.creator";

const NovelPage = () => {
  const { novelId, setNovelId, getCurrentNovel } = useNovelStore();


  useEffect(() => {
    return () => {
      setNovelId(''); // 页面卸载时重置
    }
  }, [])
  return (
    <div className="h-full relative flex flex-col overflow-x-hidden">
      {
        novelId ? <NovelEditor content={getCurrentNovel()?.content || ''} /> :
          <NovelCreator />
      }

    </div>
  );
};

export default NovelPage;
