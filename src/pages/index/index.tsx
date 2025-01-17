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
    <div className="relative flex flex-col items-center h-[100dvh] overflow-y-auto pb-12">
      <AdvancedRichEditorProvider
        editorContainerProps={{
          className: 'shadow-lg flex-1 rounded-[16px] border-muted border py-4 px-6 w-[80dvw]'
        }}
        content={content}
        slotBefore={
          <div className="sticky top-0 left-0 right-0 w-full z-99 bg-background flex justify-end items-center border-b mb-4">
            <ModelSetting />
            <Operator />
          </div>
        }
      />
    </div>
  )
}
