import { useEffect } from "react";
import { RichEditorProvider } from "@/components/rich-editor";

import { EditorProviderProps, useCurrentEditor } from "@tiptap/react";

import {
  useAdvancedExtentions
} from "@/components/advanced-rich-editor";
import EditorBar from "@/pages/dashboard/novel/components/editor-bar";
import NovelBubbleMenu from "./novel-bubble-menu";
import ChatAssistantLoader from "./chat-assistant-loader";
export default function NovelEditor({
  content,
  children,
  ...props
}: EditorProviderProps) {
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
        slotBefore={<EditorBar />}
        slotAfter={<ChatAssistantLoader />}
        extensions={extentions}
        editorContainerProps={{
          className:
            "flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] mb-8 mt-2 p-4",
        }}
        {...props}
      >
        {children}
        <NovelBubbleMenu />
      </RichEditorProvider>
    </>
  );
}
