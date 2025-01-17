import { Settings } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import ModelSettings from './model-settings'
import { providers } from '@/constants/seed'
import { useMemo } from 'react'
import { IconSize } from '@/constants'

export const ModelConfigPanel = () => {
  const currentProvider = useMemo(() => {
    const modelConfig = JSON.parse(localStorage.getItem('model-config') || '{}')
    return modelConfig.id ? modelConfig: providers[0]
  }, [providers])
  return (
    <>
      <ModelSettings
        providers={providers}
        currentProvider={currentProvider}
        onSave={async (config) => {
          return new Promise(resolve => {
            setTimeout(() => {
              localStorage.setItem('model-config', JSON.stringify(config));
              resolve();
            }, 500)
          })
        }}
      />
    </>
  )
}

export default function () {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Settings size={IconSize} className='mr-1'/>
        </SheetTrigger>
        <SheetContent side={'left'} className="w-[300px]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <ModelConfigPanel />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
