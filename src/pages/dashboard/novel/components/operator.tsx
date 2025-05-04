import {
  Code2,
  Download,
  Paintbrush,
  Redo2,
  Undo2,
  Upload,
} from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { IconSizeSmall, IconSizeSmall as size } from "@/constants";
import { handleExport, handleImport } from "@/utils";
import { ColorSelector, NodeSelector, TextButtons } from "@/components/advanced-rich-editor";
import Tippy from "@tippyjs/react";
import 'tippy.js/animations/shift-away.css';

export default function Operator() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }


  return (
    <>
      <div
        className="cursor-pointer rounded-sm bg-slate-50 "
        onClick={() => handleExport(editor)}
      >
        <Download size={size} />
      </div>

      <input
        type="file"
        accept=".md,.txt"
        style={{ display: "none" }}
        id="import-md"
        onChange={(event) => handleImport(editor, event)}
      />
      <label
        htmlFor="import-md"
        className="cursor-pointer rounded-sm bg-slate-50 "
      >
        <Upload size={size} />
      </label>
      <Separator className="w-full" orientation="horizontal" />

      <div
        className="cursor-pointer rounded-sm bg-slate-50  "
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={size} />
      </div>
      <div
        className="cursor-pointer rounded-sm bg-slate-50  "
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={size} />
      </div>
      <div
        className="cursor-pointer rounded-sm bg-slate-50  "
        onClick={() => editor.chain().focus().setCodeBlock().run()}
      >
        <Code2 size={size} />
      </div>
      <Separator className="w-full" orientation="horizontal" />

      <Tippy
        animation="shift-away"
        placement="right"
        content={<div className="transition-all bg-white bg-opacity-80 shadow-md rounded-lg backdrop-blur-md">
          <TextButtons />
          <ColorSelector />
          <NodeSelector />
        </div>}
        interactive>
        <Paintbrush className="text-blue-400" size={IconSizeSmall} />
      </Tippy>
    </>
  );
}
