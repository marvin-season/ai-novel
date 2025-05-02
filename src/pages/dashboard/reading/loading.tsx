import { Loader } from 'lucide-react'

export default function Loading() {
    return (
        <div className='flex items-center gap-2'>
            <Loader size={16} />
            <span className='text-sm'>loading...</span>
        </div>
    )
}
