import React, { memo } from "react";
import { Bubble } from '@ant-design/x';
import { BaseMessageProps } from "@/types";
import { BotIcon } from "lucide-react";
import { IconSizeSmall } from "@/constants";
/**
 * Props for the UserMessage component
 */
interface UserMessageProps extends BaseMessageProps { }

/**
 * User message UI component
 */
export const BotMessage = memo(({ message }: UserMessageProps) => {
  return (
    <Bubble
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
