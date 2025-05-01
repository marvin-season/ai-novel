'use client'

import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react';
import "tippy.js/animations/shift-away.css"; // 过渡动画
import { loadLLMFromSettings } from '@/utils/load-llm';
import { getPrompt } from '@/utils/prompt-factory';
import { streamText } from 'ai';
import { useCompletion } from '@ai-sdk/react';
import { Loader } from 'lucide-react';
import AiCompleteResultPanel from '@/components/advanced-rich-editor/ai-feature/ai-completion-result-panel';
const doc = `React is a JavaScript library developed and maintained by Meta (formerly Facebook) and a community of developers. Its primary purpose is to facilitate building user interfaces through a component-based architecture. React employs a virtual DOM for efficient rendering and updates, allowing developers to create interactive UIs that update predictably.`

export default function Page() {

    const [tippy, setTippy] = useState<{
        text: string;
        target: HTMLElement | null;
    }>({
        text: '',
        target: null,
    });

    return (
        <div className=''>
            {
                doc.split(/([.!\s])/).map((line, index) => (
                    <span
                        onClick={(e) => {
                            setTippy({
                                text: line,
                                target: e.currentTarget,
                            })
                        }}
                        key={index}
                        className="flex-1 pb-1 leading-8 cursor-pointer border-b-1 border-transparent hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
                    >
                        {line}
                    </span>

                ))
            }
            <Tippy
                className={`backdrop-blur leading-6 px-4 py-2 rounded-lg shadow-lg`}
                content={<Answer text={tippy.text} />}
                visible={!!tippy.target}
                reference={(tippy.target)}
                onClickOutside={() => {
                    setTippy({
                        text: '',
                        target: null,
                    })
                }}
                placement='bottom-start'
                animation="shift-away"
                interactive
            ></Tippy>
        </div>
    )
}


const Answer = ({ text }: { text: string }) => {
    const { completion, complete, isLoading, setCompletion } = useCompletion({
        fetch: async (request, info) => {
            const { command, context, prompt } = info ? JSON.parse((info.body as string) || '{}') : {}
            //生成提示词
            const messages = getPrompt({
                command,
                context,
                prompt,
            })
            // 解析请求参数
            const model = loadLLMFromSettings({ provider: 'deepseek' })
            if (!model) {
                return new Response()
            }
            const config: Parameters<typeof streamText>[0] = {
                model,
                messages,
            }
            const stream = streamText(config)

            // 返回 Response 对象
            return stream.toDataStreamResponse()
        },
        onResponse: (response) => {
            if (response.status === 429) {
                return
            }
        },
        onError: (e) => {
        },
    })
    useEffect(() => {
        console.log('text', text)
        text && complete(text)
    }, [text]);
    return (
        <>
            {
                completion.length === 0 ? <div className='flex items-center gap-2'>
                    <Loader size={16} />
                    <span className='text-sm'>loading...</span>
                </div> : <AiCompleteResultPanel content={completion}>
                </AiCompleteResultPanel>
            }

        </>
    )
}