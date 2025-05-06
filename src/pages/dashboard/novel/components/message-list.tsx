import { messageRegistry } from "@/registry/messageRegistry";
import { useAgentStore } from "@/store/agent";
import { useMemo } from "react";

const MessageList: React.FC = () => {
  // Get messages from store
  const messages = useAgentStore((state) => state.messages);

  // Memoize the rendered messages to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) =>
      messageRegistry.renderMessage(message, index),
    );
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 pb-8">
      {renderedMessages}
    </div>
  );
};

export default MessageList;
