import { Button } from '@/components/ui/button';
import { IconSizeSmall } from '@/constants';
import { useNovelStore } from '@/store/novel';
import { CaretLeft, FloppyDisk } from '@phosphor-icons/react';
import { useCurrentEditor } from '@tiptap/react';
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner';

export default function NovelSelect() {
    const { setNovelId, novelId, getCurrentNovel, updateNovel } = useNovelStore();

    const { editor } = useCurrentEditor();

    return (
        <div className="mr-auto h-full flex gap-2 items-center">
            <Button
                size='sm'
                variant={'ghost'}
                onClick={() => {
                    setNovelId('');
                }}>
                <CaretLeft size={IconSizeSmall} />
            </Button>
            {novelId && <Button
                size='sm'
                variant={'ghost'}
                onClick={() => {
                    const md = editor?.storage.markdown.getMarkdown();
                    if (md) {
                        updateNovel(novelId, md)
                        toast.success(`保存成功`)
                    }
                }}>
                <FloppyDisk size={IconSizeSmall} />
            </Button>}
            <span className='mx-2 text-sm w-[100px] text-gray-600 truncate'>{getCurrentNovel()?.title}</span>

        </div>
    )
}
