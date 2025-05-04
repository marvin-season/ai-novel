import React, { memo } from "react";
import { Bubble } from '@ant-design/x';
import { BaseMessageProps } from "@/types";
import { BotIcon, CornerDownLeft } from "lucide-react";
import { IconSizeSmall } from "@/constants";
import { IMessageStatus } from "@/store/agentStore";
import { useCurrentEditor } from "@tiptap/react";
/**
 * Props for the UserMessage component
 */
interface BotMessageProps extends BaseMessageProps {
}

/**
 * User message UI component
 */
export const BotMessage = memo(({ message }: BotMessageProps) => {
  const { editor } = useCurrentEditor();
  return (
    <Bubble
      header={<span className="text-xs text-gray-400">{new Date(message.timestamp!).toLocaleString()}</span>}
      footer={<CornerDownLeft className="text-blue-500" size={IconSizeSmall} onClick={() => {
        editor?.commands.insertContent(message.content)
      }} />}
      loading={message.status === IMessageStatus.loading}
      placement="start"
      content={message.content}
      avatar={{
        icon: <BotIcon size={IconSizeSmall} />, style: {
          color: '#3cb7fa',
          backgroundColor: '#d4f4f5',
        }
      }} />
  );
});
