import { useEffect, useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";
import GenerativeBubbleMenu from "./ai-feature/generative-bubble-menu";
import { Separator } from "@/components/ui/separator";

import { ColorSelector } from "./selector/color-selector";
import { NodeSelector } from "./selector/node-selector";
import useAdvancedExtentions from "./hooks/useExtentions";

import "./style.css";
import { EditorProviderProps, useCurrentEditor } from "@tiptap/react";
import { TextButtons } from "./selector/text-buttons";

export default function AdvancedRichEditorProvider({
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
        {/*<AutoSave/>*/}
      </RichEditorProvider>
    </>
  );
}
