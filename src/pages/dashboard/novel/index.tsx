import { AdvancedRichEditorProvider } from "@/components/advanced-rich-editor";
import Content from "@/components/rich-editor/content";
import Operator from "@/components/rich-editor/operator/operator.tsx";

const NovelPage = () => {
  const content  = '';

  return (
    <div className="h-full relative flex">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className:
            "flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] mb-8 mt-2 p-4",
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
