import NovelEditor from "./components/novel-editor";

const NovelPage = () => {
  const content = '';
  return (
    <div className="h-full relative flex mr-8">
      <NovelEditor content={content} />
    </div>
  );
};

export default NovelPage;
