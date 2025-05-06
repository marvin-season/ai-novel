import { type ReactNode } from "react";

export enum AICommand {
  improve = "improve",
  fix = "fix",
  shorter = "shorter",
  longer = "longer",
  explain = "explain",
  translate = "translate",
  continue = "continue",
  zap = "zap",
  chat = "chat",
}

export type AICommandsType = {
  value: AICommand;
  label: string;
  icon: (p: any) => ReactNode;
};

import { IMessageProps } from "@/store/agent";

export interface BaseMessageProps {
  /** Message data */
  message: IMessageProps;

  groupId?: string;

  index: number; // index of messages
}
