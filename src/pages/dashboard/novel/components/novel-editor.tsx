import { useEffect, useState } from "react";
import { RichEditorProvider } from "@/components/rich-editor";

import { EditorProviderProps, useCurrentEditor } from "@tiptap/react";

import {
  TextButtons,
  ColorSelector,
  NodeSelector,
  GenerativeBubbleMenu, useAdvancedExtentions
} from "@/components/advanced-rich-editor";
import { Separator } from "@/components/ui/separator";
import Operator from "@/components/rich-editor/operator/operator";
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
      <RichEditorProvider
        content={content}
        slotAfter={
          <div className="shadow-lg py-4 px-6 bg-background flex flex-col gap-4 items-start border-b">
            <Operator />
          </div>
        }

        extensions={extentions}
        editorContainerProps={{
          className:
            "flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] mb-8 mt-2 p-4",
        }}
        {...props}
      >
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
