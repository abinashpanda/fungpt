export type ChatUserRole = 'user' | 'agent'

export type ChatMessage = {
  id: string
  message: string
  role: ChatUserRole
  senderName?: string
  avatar?: string
}

export type WhatsappChatContextData = {
  groupName: string
  initialMessage: string
  agents: { agentName: string; agentDescription: string }[]
}
