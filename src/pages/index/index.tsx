import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
import Operator from '@/components/rich-editor/operator/operator'

export const Index = () => {
  return (
    <>
      <AdvancedRichEditorProvider slotBefore={<Operator/>}/>
    </>
  )
}
