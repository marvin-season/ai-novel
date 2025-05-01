import { Editor, JSONContent, useCurrentEditor } from "@tiptap/react";

import { useEffect, useState } from "react";
import { debounce } from 'lodash-es'

type Heading = {
    level: 1 | 2 | 3,
    text?: string
}
const headingClassMap: Record<1 | 2 | 3, string> = {
    1: 'text-[18px] text-gray-800 ml-0 leading-[2.0]',
    2: 'text-[17px] text-gray-700 ml-4 leading-[1.2]',
    3: 'text-[16px] text-gray-600 ml-8 leading-[0.8]',
};
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
    setHeadings(headings)
}, 500, {
    leading: true,
    trailing: true
});

export default function Content() {
    const { editor } = useCurrentEditor();
    const [headings, setHeadings] = useState<Heading[]>([])

    if (!editor) {
        return null;
    }

    useEffect(() => {
        caculateHeadings(editor, setHeadings);
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
                return <div className={`${headingClassMap[heading.level]} px-2 py-0.5 cursor-pointer font-serif select-none`} onClick={() => {
                    console.log(heading)
                    const targets = document.querySelectorAll(`h${heading.level}[type="tiptap-heading"]`);
                    const index = headings.filter(h => h.level === heading.level).indexOf(heading)
                    targets[index].scrollIntoView({ behavior: 'smooth' })
                }}>{heading.text}</div>
            })
        }
    </>
}