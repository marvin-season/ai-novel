import RichViewer from "@/components/rich-viewer";

export default function AiCompleteResultPanel({
  content,
}: {
  content: string;
}) {
  return (
    <div className={"p-4 max-h-72 overflow-scroll"}>
      <RichViewer content={content} />
    </div>
  );
}
