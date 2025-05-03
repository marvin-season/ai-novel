import { GenerativeBubbleMenu, NodeSelector, TextButtons, ColorSelector } from '@/components/advanced-rich-editor'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react';

type Props = {}

export default function NovelBubbleMenu({ }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
            <Separator className="h-auto" orientation="vertical" />
            <NodeSelector />
            <Separator className="h-auto" orientation="vertical" />
            <TextButtons />
            <Separator className="h-auto" orientation="vertical" />
            <ColorSelector />
        </GenerativeBubbleMenu>
    )
}