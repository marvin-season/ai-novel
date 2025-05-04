import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, ReactNode } from 'react'
type Props = {
    children: ReactElement
    content: ReactNode
}

export default forwardRef(({ children, content }: Props, ref: any) => {
    return (
        <Tippy
            delay={200}
            content={<span className='text-xs text-gray-500'>{content}</span>}
            ref={ref}>
            {children}
        </Tippy>
    )
})