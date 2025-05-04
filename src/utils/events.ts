import { IMessageProps } from "@/store/agentStore";
import { EventEmitter } from "eventemitter3";

/**
 * Global event emitter instance
 */
export const EE = new EventEmitter();

export function genrateEventName(message: IMessageProps) {
  return "event_" + message.id + message.role;
}
