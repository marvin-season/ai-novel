import React, { ReactNode } from "react";
import { IMessageProps, MessageRole } from "@/store/agent";
import {
  SystemMessage,
  UserMessage,
  BotMessage,
  ToolMessage,
  ComputerMessage,
} from "@/components/messages";
import { BaseMessageProps } from "@/types";

/**
 * Type for message component renderer
 */
type MessageRenderer = React.FC<BaseMessageProps>;

/**
 * Registry of message renderers by UI type
 */
class MessageRegistry {
  private registry = new Map<MessageRole, MessageRenderer>();

  /**
   * Register a message renderer for a UI type
   * @param type UI type identifier
   * @param renderer Component to render this message type
   */
  register(type: MessageRole, renderer: MessageRenderer): void {
    this.registry.set(type, renderer);
  }

  /**
   * Get a message renderer for a UI type
   * @param type UI type identifier
   * @returns The registered renderer or undefined if not found
   */
  getRenderer(type: MessageRole): MessageRenderer | undefined {
    return this.registry.get(type);
  }

  /**
   * Render a message with the appropriate component
   * @param message Message to render
   * @returns Rendered component or null if no renderer found
   */
  renderMessage(message: IMessageProps, index: number): ReactNode {
    const Renderer = this.getRenderer(message.role);
    if (!Renderer) return null;

    return <Renderer key={message.id} message={message} index={index} />;
  }

  /**
   * Initialize the registry with default renderers
   */
  initializeDefaults(): void {
    this.register(MessageRole.system, SystemMessage);
    this.register(MessageRole.user, UserMessage);
    this.register(MessageRole.assistant, BotMessage);
    this.register(MessageRole.tool, ToolMessage);
    this.register(MessageRole.computer, ComputerMessage);
  }
}

// Create and export a singleton instance
export const messageRegistry = new MessageRegistry();

// Initialize with default renderers
messageRegistry.initializeDefaults();
