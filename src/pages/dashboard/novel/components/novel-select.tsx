import { Button } from '@/components/ui/button';
import { useNovelStore } from '@/store/novel';
import { useCurrentEditor } from '@tiptap/react';
import { Select } from 'antd';
import React, { useEffect, useMemo } from 'react'
import { toast } from 'sonner';

export default function NovelSelect() {
    const setNovelId = useNovelStore(state => state.setNovelId)
    const updateNovel = useNovelStore(state => state.updateNovel)
    const createNovel = useNovelStore(state => state.createNovel)
    const { novels, novelId } = useNovelStore();

    const { editor } = useCurrentEditor();


    useEffect(() => {
        const currentNovel = novels.find(novel => novel.id === novelId)
        if (currentNovel) {
            editor?.commands.setContent(currentNovel.content);
        }
    }, [novelId]);

    const novelOptions = useMemo(
        () =>
            novels.map(item => ({ value: item.id, label: item.title }))
        , [novels]);
    return (
        <div className="mr-auto h-full flex gap-2 items-center">
            <Select
                value={novelId}
                className="w-[200px] truncate"
                showSearch
                placeholder="Select a novel"
                onChange={(id) => {
                    setNovelId(id)
                }}
                onSearch={console.log}
                options={novelOptions}
            />
            <Button size={"sm"} variant="ghost" onClick={() => {
                const md = editor?.storage.markdown.getMarkdown();
                if (novelId && md) {
                    updateNovel(novelId, md)
                } else {

                    createNovel({ content: md, title: "未命名" })
                }
                toast.success("保存成功")
            }}>保存</Button>
        </div>
    )
}
