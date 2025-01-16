import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
import Operator from '@/components/rich-editor/operator/operator'
import ModelSetting from '@/components/setting'
import { Separator } from '@/components/ui/separator'

export const Index = () => {
  return (
    <div className="p-8 pt-2 relative ">
      <AdvancedRichEditorProvider
        slotBefore={
          <div className="sticky top-2 flex justify-end items-center border-b mb-4">
            <ModelSetting/>
            <Operator />
          </div>
        }
      />
    </div>
  )
}
