import NovelEditor from "./components/novel-editor";

const NovelPage = () => {
  const content = '';
  return (
    <div className="h-full relative flex flex-col transition-all">
      <NovelEditor content={content} />
    </div>
  );
};

export default NovelPage;
