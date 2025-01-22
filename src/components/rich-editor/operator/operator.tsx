import {
  Code2,
  FileInputIcon,
  Redo2,
  SaveAll,
  SaveIcon,
  Undo2,
} from "lucide-react";
import { Editor, useCurrentEditor } from "@tiptap/react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { IconSize as size } from "@/constants";
import { useDebounce } from "ahooks";
import { updateContentMD } from "@/store/slice/NoveSlice.ts";
import { useDispatch } from "react-redux";

function handleExport(editor: Editor) {
  // const json = editor.getJSON();
  const md = editor.storage.markdown.getMarkdown();
  // const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
  const blob = new Blob([md], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "editor-content.md";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Exported successfully!");
}

async function handleImport(
  editor: Editor,
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file = event.target.files?.[0];
  if (file) {
    if (!file.name.endsWith(".md")) {
      toast.error("Invalid file format.");
      return;
    }
    const text = await file.text();
    // const json = JSON.parse(text);
    editor.commands.setContent(text);
    toast.success("Imported successfully!");
  } else {
    toast.error("No file selected.");
  }
}

export default function Operator() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  const dispatch = useDispatch();

  const handleUpdate = useDebounce(() => {
    const markdown = editor?.storage.markdown.getMarkdown();
    dispatch(updateContentMD(markdown));
  }, {});

  return (
    <>
      <div
        className="cursor-pointer rounded-sm bg-slate-50  "
        onClick={handleUpdate}
      >
        <SaveAll size={size} />
      </div>
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
      <div
        className="cursor-pointer rounded-sm bg-slate-50 "
        onClick={() => handleExport(editor)}
      >
        <SaveIcon size={size} />
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
        <FileInputIcon size={size} />
      </label>
    </>
  );
}
