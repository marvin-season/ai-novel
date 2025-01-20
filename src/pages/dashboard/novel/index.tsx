import { AdvancedRichEditorProvider } from "@/components/advanced-rich-editor";
import Operator from "@/components/rich-editor/operator/operator.tsx";
import ModelSetting from "@/components/setting";

const content = `
\`\`\`js
import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'

\`\`\`

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
`;

const NovelPage = () => {
  return (
    <div className="relative flex h-full">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className: "flex-1 rounded-[16px] w-[85dvw] overflow-y-auto flex",
        }}
        content={content}
        slotBefore={
          <div className="shadow-lg p-2 bg-background flex flex-col gap-2 items-start border-b">
            <ModelSetting />
            <Operator />
          </div>
        }
      />
    </div>
  );
};

export default NovelPage;
