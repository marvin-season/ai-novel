import NovelEditor from "./components/novel-editor";

const NovelPage = () => {
  const content = '';

  return (
    <div className="h-full relative flex">
      <NovelEditor content={content} />
    </div>
  );
};

export default NovelPage;
