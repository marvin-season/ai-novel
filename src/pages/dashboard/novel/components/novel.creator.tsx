import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNovelStore } from "@/store/novel";
import { useCurrentEditor } from "@tiptap/react";
import { generateId } from "ai";
import { useState } from "react";
import { toast } from "sonner";
import NovelCard from "./novel-card";
import { useNavigate } from "react-router-dom";

export default function NovelCreator() {
    const [title, setTitle] = useState('');
    const { setNovelId, createNovel, novels } = useNovelStore();
    const navigate = useNavigate()

    const { editor } = useCurrentEditor();
    return (
        <div className="h-dvh flex flex-col items-center justify-center gap-4">
            <div className="flex gap-4 items-center">
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-[300px]" placeholder="输入名称创建一个新的笔记" />
                <Button size={'sm'} onClick={() => {
                    if (!title) {
                        toast.error('请输入标题')
                        return
                    }
                    const md = editor?.storage.markdown.getMarkdown();
                    const id = generateId()
                    createNovel({ id, content: md, title: title.endsWith('.md') ? title : title + '.md' });
                    setNovelId(id)
                    toast.success(`创建成功`)
                }}>Create</Button>
            </div>
            <div className="no-scrollbar p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-[250px] overflow-scroll">
                {
                    novels.map(novel => {
                        return <NovelCard key={novel.id} novel={novel} onClick={() => {
                            setNovelId(novel.id)
                            navigate('/')
                        }} />
                    })
                }
            </div>
        </div>
    )
}
