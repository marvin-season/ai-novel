import { Settings } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import ModelSettings from './model-settings'
import { providers } from '@/constants/seed'

export const ModelConfigPanel = () => {
  return (
    <>
      <ModelSettings providers={providers} currentProvider={providers[0]} onSave={console.log} />
    </>
  )
}

export default function () {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Settings size={12} />
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
