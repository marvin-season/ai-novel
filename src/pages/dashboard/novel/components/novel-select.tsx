import { useNovelStore } from '@/store/novel';
import { useCurrentEditor } from '@tiptap/react';
import { Select, Button, Modal, Input } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

export default function NovelSelect() {
    const { novels, novelId, getCurrentNovel, updateNovel } = useNovelStore();

    const { editor } = useCurrentEditor();


    useEffect(() => {
        const currentNovel = getCurrentNovel();
        if (currentNovel) {
            editor?.commands.setContent(currentNovel.content);
        }
    }, [novelId, getCurrentNovel]);

    const operateName = useMemo(() => {
        return novelId ? '保存' : '创建'
    }, [novelId])

    return (
        <div className="mr-auto h-full flex gap-2 items-center">
            <span className='text-sm w-[100px] truncate'>{getCurrentNovel()?.title}</span>
            {novelId && <Button onClick={() => {
                const md = editor?.storage.markdown.getMarkdown();
                if (md) {
                    updateNovel(novelId, md)
                    toast.success(`${operateName}成功`)
                }
            }}>{'保存'}</Button>
            }
        </div>
    )
}
