import { AdvancedRichEditorProvider } from '@/components/advanced-rich-editor'
import Operator from '@/components/rich-editor/operator/operator'

export const Index = () => {
  return (
    <div className='p-8 relative'>
      <AdvancedRichEditorProvider slotBefore={<div className='sticky border-b mb-4'><Operator/></div>}/>
    </div>
  )
}
