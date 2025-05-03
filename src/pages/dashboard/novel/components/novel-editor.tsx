import { useEffect, useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";

import { EditorProviderProps, useCurrentEditor } from "@tiptap/react";
import GenerativeBubbleMenu from "@/components/advanced-rich-editor/ai-feature/generative-bubble-menu";
import useAdvancedExtentions from "@/components/advanced-rich-editor/hooks/useExtentions";
import { ColorSelector } from "@/components/advanced-rich-editor/selector/color-selector";
import { NodeSelector } from "@/components/advanced-rich-editor/selector/node-selector";
import { TextButtons } from "@/components/advanced-rich-editor/selector/text-buttons";
import { Separator } from "@/components/ui/separator";
export default function NovelEditor({
  content,
  children,
  ...props
}: EditorProviderProps) {
  const [open, setOpen] = useState(false);
  const extentions = useAdvancedExtentions();
  const { editor } = useCurrentEditor();
  useEffect(() => {
    editor?.commands.setContent(content || "");
    return () => {
      editor?.commands.setContent("");
    };
  }, []);
  return (
    <>
      <RichEditorProvider content={content} extensions={extentions} {...props}>
        {children}
        {/* <GenerativeFloatingMenu></GenerativeFloatingMenu> */}
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator className="h-auto" orientation="vertical" />
          <NodeSelector />
          <Separator className="h-auto" orientation="vertical" />
          <TextButtons />
          <Separator className="h-auto" orientation="vertical" />
          <ColorSelector />
        </GenerativeBubbleMenu>
      </RichEditorProvider>
    </>
  );
}
