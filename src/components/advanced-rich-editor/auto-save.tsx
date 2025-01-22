import { useDispatch } from "react-redux";
import { useCurrentEditor } from "@tiptap/react";
import { memo, useEffect } from "react";
import { useDebounce } from "ahooks";
import { updateContentMD } from "@/store/slice/NoveSlice.ts";
import { AppDispatch } from "@/store";

export default memo(function AutoSave() {
  console.log("AutoSave");
  const dispatch = useDispatch<AppDispatch>();
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
}, () => true);
