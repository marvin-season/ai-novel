import { CrazySpinner } from "@/components/ui/icon.tsx";

export const Loading = () => {
  return (
    <div className={'h-full flex justify-center items-center'}>
      <CrazySpinner />
    </div>
  )
}