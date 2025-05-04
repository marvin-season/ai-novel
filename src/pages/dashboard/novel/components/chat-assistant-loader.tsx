import { IconSizeMiddle } from '@/constants';
import { CaretCircleDoubleLeft } from '@phosphor-icons/react';
import { useState } from 'react'
import ChatAssistant from './chat-assistant';
import { Separator } from '@/components/ui/separator';


export default function ChatAssistantLoader() {
    const [visible, setVisible] = useState(true);

    return (
        <div className={`absolute flex h-dvh right-0 top-0 transition-all duration-500 ${visible ? '' : 'translate-x-[400px]'}`}>
            {/* {visible && <Separator orientation="vertical" />} */}

            <CaretCircleDoubleLeft
                className={`text-gray-400 hover:text-gray-600 cursor-pointer m-auto transition-all ${!visible ? 'rotate-0' : 'rotate-180'}`}
                size={IconSizeMiddle} weight="thin"
                onClick={() => {
                    setVisible(!visible)
                }}

            />

            <ChatAssistant visible={visible} />
        </div>

    )
}
