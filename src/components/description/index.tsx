import { memo } from "react"

const textSizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
}

function Description({ content = '', size = 'xs' }: {
    content: string,
    size?: keyof typeof textSizeMap
}) {
    const textSize = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
    }[size]
    return (
        <span className={`${textSize} text-gray-500`}>{content}</span>
    )
}

export default memo(Description)