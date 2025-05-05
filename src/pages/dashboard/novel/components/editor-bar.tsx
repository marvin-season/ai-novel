import {
  Code2,
  Download,
  Redo2,
  Undo2,
  Upload,
} from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import {  IconSizeSmall as size } from "@/constants";
import { handleExport, handleImport } from "@/utils";
import { TextButtons } from "@/components/advanced-rich-editor";
import 'tippy.js/animations/shift-away.css';
import { Button } from "@/components/ui/button";
import NovelSelect from "./novel-select";
export default function EditorBar() {
  const { editor } = useCurrentEditor();


  if (!editor) {
    return null;
  }


  return (
    <div className="px-2 py-2 bg-background flex gap-2 items-start justify-end border-b">
      <NovelSelect />
      <div className="flex">
        <TextButtons />
        <Button size="sm" className="rounded-none" variant="ghost"
          onClick={() => editor.chain().focus().setCodeBlock().run()}
        >
          <Code2 size={size} />
        </Button>
        <Separator orientation="vertical" />

      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-1">
        <Separator orientation="vertical" />

        <Button size="sm" className="rounded-none" variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={size} />
        </Button>
        <Button size="sm" className="rounded-none" variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={size} />
        </Button>
        <Button size="sm" className="rounded-none" variant="ghost"
          onClick={() => handleExport(editor)}
        >
          <Download size={size} />
        </Button>

        <Button size="sm" className="rounded-none" variant="ghost">
          <label
            htmlFor="import-md"
            className="cursor-pointer rounded-sm bg-slate-50 "
          >
            <Upload size={size} />
          </label>
        </Button>
        <input
          type="file"
          accept=".md,.txt"
          style={{ display: "none" }}
          id="import-md"
          onChange={(event) => handleImport(editor, event)}
        />
      </div>
    </div>
  );
}
