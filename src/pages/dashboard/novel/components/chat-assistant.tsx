import { MessageType, useAgentStore } from "@/store/agentStore";
import MessageList from "./message-list";
import { Sender } from '@ant-design/x';
import { generateId } from "@/utils";
export default function ChatAssistant() {
  const updateMessage = useAgentStore((state) => state.updateMessage);

  return (
    <div className="flex flex-col h-full p-4">
      <MessageList />
      <Sender
        onSubmit={(content) => {
          updateMessage({
            id: generateId(),
            content,
            timestamp: Date.now(),
            type: MessageType.user,
          });
        }}
        allowSpeech
      />
    </div>
  )
}