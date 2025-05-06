import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/store/agent";
import { useCurrentEditor } from "@tiptap/react";
import { Bot } from "lucide-react";

export function AssistantSelector() {
  const setValue = useAgentStore((state) => state.setValue);
  const { editor } = useCurrentEditor();
  return (
    <Button
      size="sm"
      className="gap-2 rounded-none"
      variant="ghost"
      onClick={() => {
        const slice = editor!.state.selection.content();
        const text = editor!.storage.markdown.serializer.serialize(
          slice.content,
        );
        console.log(text);
        setValue(text);
      }}
    >
      <Bot className="text-blue-500" />
    </Button>
  );
}
