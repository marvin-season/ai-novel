import { useEffect } from "react";
import { RichEditorProvider } from "@/components/rich-editor";
import { useCurrentEditor } from "@tiptap/react";

type Props = {
  content?: string;
};

export default function RichViewer({ content }: Props) {
  return (
    <RichEditorProvider editable={false}>
      <RichEditor content={content} />
    </RichEditorProvider>
  );
}

const RichEditor = ({ content }: { content?: string }) => {
  const { editor } = useCurrentEditor();
  useEffect(() => {
    content && editor?.commands.setContent(content);
  }, [content, editor]);
  return <></>;
};
