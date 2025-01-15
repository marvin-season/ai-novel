import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
import Operator from '@/components/rich-editor/operator/operator'
import ModelSetting from '@/components/setting'

export const Index = () => {
  return (
    <div className="p-8 relative">
      <AdvancedRichEditorProvider
        slotBefore={
          <div className="flex justify-end items-center border-b mb-4">
            <div>
              <ModelSetting/>
            </div>
            <Operator />
          </div>
        }
      />
    </div>
  )
}
