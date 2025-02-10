import { AdvancedRichEditorProvider } from "@/components/advanced-rich-editor";
import Content from "@/components/rich-editor/content";
import Operator from "@/components/rich-editor/operator/operator.tsx";
import { useAppSelector } from "@/store";

const NovelPage = () => {
  const content  = useAppSelector(state => state.novel.contentMD);

  return (
    <div className="h-full relative flex">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className:
            "flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] my-8",
        }}
        content={content}
        slotAfter={
          <div className="shadow-lg py-4 px-6 bg-background flex flex-col gap-4 items-start border-b">
            <Operator />
          </div>
        }
        slotBefore={
          <div className="p-4 bg-slate-50 overflow-y-auto">
            <Content/>
          </div>
        }
      />
    </div>
  );
};

export default NovelPage;
