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
import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
\`\`\`
## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'

\`\`\`

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
\`\`\`

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'

\`\`\`

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
`;

const NovelPage = () => {
  return (
    <div className="h-full relative flex">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className: "flex-1 overflow-y-auto flex justify-center items-center rounded-[16px] my-8",
        }}
        content={content}
        slotBefore={
          <div className="shadow-lg p-2 px-3.5 bg-background flex flex-col gap-2 items-start border-b">
            <ModelSetting />
            <Operator />
          </div>
        }
      />
    </div>
  );
};

export default NovelPage;
