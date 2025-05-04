import React, { memo } from "react";
import { Bubble } from '@ant-design/x';
import { BaseMessageProps } from "@/types";
import { BotIcon } from "lucide-react";
import { IconSizeSmall } from "@/constants";
import { IMessageStatus } from "@/store/agentStore";
/**
 * Props for the UserMessage component
 */
interface BotMessageProps extends BaseMessageProps {
}

/**
 * User message UI component
 */
export const BotMessage = memo(({ message }: BotMessageProps) => {
  return (
    <Bubble
      header={<span className="text-xs text-gray-400">{new Date(message.timestamp!).toLocaleString()}</span>}
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
