import { Editor, JSONContent, useCurrentEditor } from "@tiptap/react";

import { useEffect, useState } from "react";
import { debounce } from 'lodash-es'

type Heading = {
    level: number,
    text?: string
}

const extractHeadings = (node: JSONContent, level = 0) => {
    const headings: Heading[] = [];
    if (node.type === 'heading' && node.attrs) {
        const { level, text } = node.attrs;
        if (level >= 1 && level <= 3) {
            headings.push({ level, text: node.content?.[0].text });
        }
    }
    if (node.content) {
        node.content.forEach(child => {
            headings.push(...extractHeadings(child, level + 1))
        });
    }

    return headings
};

const caculateHeadings = debounce((editor: Editor, setHeadings) => {
    const content = editor.getJSON();

    const headings = extractHeadings(content)
    console.log(content, headings)
    setHeadings(headings)
}, 500, {
    
});

export default function Content() {
    const { editor } = useCurrentEditor();
    const [headings, setHeadings] = useState<Heading[]>([])

    if (!editor) {
        return null;
    }

    useEffect(() => {
        editor.on('update', () => {
            caculateHeadings(editor, setHeadings);
        })

        // editor.off('update')

    }, [editor])

    useEffect(() => {
        console.log('headings', headings)
    }, [headings])

    return <>
        {
            headings.map(heading => {
                return <div className={``}>{heading.text}</div>
            })
        }
    </>
}