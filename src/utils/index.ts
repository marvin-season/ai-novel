import { Editor } from "@tiptap/core";
import { toast } from "sonner";


// 下载 TXT 文件
export const handleDownloadText = (text: string) => {
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'converted.txt';
  link.click();
};

export function handleExport(editor: Editor) {
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

export async function handleImport(
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