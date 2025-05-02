import React, { useState } from 'react'
import Tippy from '@tippyjs/react';
import "tippy.js/animations/shift-away.css"; // 过渡动画
import { useDocStore } from '@/store';
import Completion from './completion';
import { command } from 'node_modules/@tiptap/core/dist/commands';
import { useCompletion } from '@ai-sdk/react';
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

    const { complete, ...completionProps } = useCompletion({
        fetch: completionFetch,
        onResponse: (response) => {
            if (response.status === 429) {
                return
            }
        },
        onError: (e) => {
        },
    })

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
                            completionProps.setCompletion(' ')
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
                content={<Completion {...completionProps} onCommand={command => {
                    tippy.text && complete(tippy.text, {
                        body: {
                            command
                        }
                    })
                }} />}
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