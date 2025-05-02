import React, { useEffect, useMemo, useState } from 'react'
import Tippy from '@tippyjs/react';
import "tippy.js/animations/shift-away.css"; // 过渡动画
import { loadLLMFromSettings } from '@/utils/load-llm';
import { getPrompt } from '@/utils/prompt-factory';
import { streamText } from 'ai';
import { useCompletion } from '@ai-sdk/react';
import { Loader } from 'lucide-react';
import RichViewer from '@/components/rich-viewer';
import { useDocStore } from '@/store';
import completionFetch from '@/utils/completion-fetch';

export default function ReadingENG() {
    const content = useDocStore(state => state.content);
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
                content.split(/([.!\s])/).map((line, index) => (
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
        fetch: completionFetch,
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
        text && complete(text, {
            body: {
                command: 'eng'
            }
        })
    }, [text]);
    return (
        <>
            {
                completion.length === 0 ? <div className='flex items-center gap-2'>
                    <Loader size={16} />
                    <span className='text-sm'>loading...</span>
                </div> : <RichViewer content={completion}>
                </RichViewer>
            }

        </>
    )
}