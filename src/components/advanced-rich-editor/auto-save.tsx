import { useDispatch } from "react-redux";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect } from "react";
import { useDebounce } from "ahooks";
import { updateContentMD } from "@/store/slice/NoveSlice.ts";

export default function AutoSave() {
  const dispatch = useDispatch();
  const { editor } = useCurrentEditor();

  const handleUpdate = useDebounce(() => {
    const markdown = editor?.storage.markdown.getMarkdown();
    console.log(markdown);
    dispatch(updateContentMD(markdown));
  }, {});

  useEffect(() => {
    if (!editor) return;

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, []);

  return <></>;
}
