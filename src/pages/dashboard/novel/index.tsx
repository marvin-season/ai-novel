import ChatAssistant from "./components/chat-assistant";
import FloatHandle from "./components/float-handle";
import NovelEditor from "./components/novel-editor";

const NovelPage = () => {
  const content = '';
  return (
    <div className="h-full relative flex">
      <NovelEditor content={content} />
      <ChatAssistant />
      <FloatHandle />
    </div>
  );
};

export default NovelPage;
