import { IconSizeMiddle } from '@/constants';
import { CaretCircleDoubleLeft } from '@phosphor-icons/react';
import { useState } from 'react'
import ChatAssistant from './chat-assistant';
import { Separator } from '@/components/ui/separator';


export default function ChatAssistantLoader() {
    const [loadChatAssistant, setLoadChatAssistant] = useState(true);

    return (
        <>
            <CaretCircleDoubleLeft
                className={`text-gray-400 hover:text-gray-600 cursor-pointer m-auto transition-all ${!loadChatAssistant ? 'rotate-0' : 'rotate-180'}`}
                size={IconSizeMiddle} weight="thin"
                onClick={() => {
                    setLoadChatAssistant(!loadChatAssistant)
                }}

            >

            </CaretCircleDoubleLeft>
            {loadChatAssistant && <Separator orientation="vertical" />}

            {loadChatAssistant && <ChatAssistant />}
        </>

    )
}
