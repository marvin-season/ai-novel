import { useNovelStore } from '@/store/novel';
import { Plus } from '@phosphor-icons/react';
import { useCurrentEditor } from '@tiptap/react';
import { Select, Button, Modal, Input } from 'antd';
import { set } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

export default function NovelSelect() {
    const setNovelId = useNovelStore(state => state.setNovelId)
    const updateNovel = useNovelStore(state => state.updateNovel)
    const createNovel = useNovelStore(state => state.createNovel)
    const { novels, novelId } = useNovelStore();

    const { editor } = useCurrentEditor();

    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const currentNovel = novels.find(novel => novel.id === novelId)
        if (currentNovel) {
            editor?.commands.setContent(currentNovel.content);
        }
    }, [novelId]);

    const operateName = useMemo(() => {
        return novelId ? '保存' : '创建'
    }, [novelId])

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
            <Button icon={<Plus />} onClick={() => {
                const md = editor?.storage.markdown.getMarkdown();
                if (novelId) {
                    updateNovel(novelId, md)
                    toast.success(`${operateName}成功`)
                } else {
                    setOpen(true)
                }
            }}>{operateName}</Button>

            <Modal
                open={open}
                onCancel={() => setOpen(false)} onOk={() => {
                    if (!title) {
                        toast.error('请输入标题')
                    }
                    const md = editor?.storage.markdown.getMarkdown();
                    createNovel({ content: md, title });
                    toast.success(`${operateName}成功`)
                    setOpen(false)
                }}>
                <Input
                    className='mt-10'
                    placeholder="请输入名称"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Modal>
        </div>
    )
}
