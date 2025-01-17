import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
import Operator from '@/components/rich-editor/operator/operator'
import ModelSetting from '@/components/setting'
const content = `
\`\`\`js
import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'

\`\`\`

## AdvancedRichEditorProvider
+ GenerativeFloatingMenu
+ GenerativeBubbleMenu
`

export const Index = () => {
  return (
    <div className="relative flex flex-col items-center h-[100dvh] pb-12">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className: 'flex-1 rounded-[16px] w-[85dvw] overflow-y-auto flex'
        }}
        content={content}
        slotBefore={
          <div className="shadow-lg py-2 w-full bg-background flex justify-end items-center border-b mb-4">
            <ModelSetting />
            <Operator />
          </div>
        }
      />
    </div>
  )
}
