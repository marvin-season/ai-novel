import React, { memo } from "react";
import { Bubble } from '@ant-design/x';
import { BaseMessageProps } from "@/types";
import { UserOutlined } from '@ant-design/icons';
/**
 * Props for the UserMessage component
 */
interface UserMessageProps extends BaseMessageProps { }

/**
 * User message UI component
 */
export const UserMessage = memo(({ message }: UserMessageProps) => {
  return (
    <Bubble
      header={<span className="text-xs text-gray-400">{new Date(message.timestamp!).toLocaleString()}</span>}
      placement="end"
      content={message.content}
      avatar={{
        icon: <UserOutlined />, style: {
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }
      }} />

  );
});
