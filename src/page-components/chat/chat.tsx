import { Button, Form, Input } from 'antd'
import { v4 } from 'uuid'
import { useCallback, useState } from 'react'
import { faker } from '@faker-js/faker'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { PlusOutlined, MessageOutlined } from '@ant-design/icons'
import WhatsappChat from '~/components/whatsapp-chat'
import { ChatMessage, ChatUserRole, WhatsappChatContextData } from '~/types/chat'
import { api } from '~/utils/api'

export default function Chat() {
  const [chatContextData, setChatContextData] = useState<WhatsappChatContextData | undefined>()
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const getMessageMutation = api.chat.getChatMessage.useMutation()

  const generateMessages = useCallback(
    async (data: WhatsappChatContextData) => {
      for (const agent of data.agents) {
        const message = await getMessageMutation.mutateAsync({
          prevMessages: [
            { message: data.initialMessage, senderName: '' },
            ...messages.map((item) => ({ senderName: item.senderName!, message: item.message })),
          ],
          senderName: agent.agentName,
          systemMessage: agent.agentDescription,
          groupName: data.groupName,
        })
        setMessages((prevState) => [
          ...prevState,
          {
            id: v4(),
            message,
            role: 'agent' as ChatUserRole,
            avatar: faker.image.urlLoremFlickr(),
            senderName: agent?.agentName,
          },
        ])
      }
    },
    [getMessageMutation, messages],
  )

  return (
    <div className="grid h-screen grid-cols-2 overflow-hidden">
      <div className="overflow-auto p-4">
        <div className="mx-auto w-full">
          <div className="mb-4 text-lg font-semibold">Create Chat</div>
          <Form
            layout="vertical"
            initialValues={{
              groupName: 'Friend Group',
              initialMessage: '',
              agents: [
                {
                  agentName: '',
                  agentDescription: '',
                },
              ],
            }}
            onFinish={(data) => {
              getMessageMutation.reset()

              setChatContextData(data)
              setMessages([])
              generateMessages(data)
            }}
          >
            <Form.Item
              name="groupName"
              label="Group Name"
              rules={[{ required: true, message: 'Group name is required' }]}
            >
              <Input placeholder="Family Group" />
            </Form.Item>
            <Form.Item
              name="initialMessage"
              label="Your Message"
              rules={[{ required: true, message: 'Your message is required' }]}
            >
              <Input.TextArea placeholder="Aj khane me kya bana he?" autoSize={{ minRows: 2 }} />
            </Form.Item>
            <Form.List name="agents">
              {(fields, { add, remove }) => {
                return (
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="col-span-full flex items-center space-x-2 font-medium">
                      <HiOutlineUserGroup className="h-6 w-6" />
                      <span className="flex-1">Group Members</span>
                      <Button
                        onClick={() => {
                          add()
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Member
                      </Button>
                    </div>
                    {fields.map((field) => {
                      return (
                        <div key={field.key} className="space-y-4 rounded-md border p-4">
                          <Form.Item
                            label="Member Name"
                            name={[field.name, 'agentName']}
                            rules={[{ required: true, message: 'Member Name is required' }]}
                            className="!mb-0"
                          >
                            <Input placeholder="Member Name" />
                          </Form.Item>
                          <Form.Item
                            className="!mb-0"
                            label="Member Description"
                            name={[field.name, 'agentDescription']}
                            rules={[{ required: true, message: 'Member Description is required' }]}
                          >
                            <Input.TextArea placeholder="Member Description" />
                          </Form.Item>
                          <Button
                            block
                            danger
                            type="dashed"
                            disabled={fields.length === 1}
                            onClick={() => {
                              remove(field.name)
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )
              }}
            </Form.List>
            <Button type="primary" block htmlType="submit" icon={<MessageOutlined />}>
              Generate Fun Chat
            </Button>
          </Form>
        </div>
      </div>
      <div className="flex items-center justify-center bg-gray-900">
        <WhatsappChat
          messages={
            chatContextData ? [{ id: v4(), message: chatContextData.initialMessage, role: 'user' }, ...messages] : []
          }
          chatContext={chatContextData}
          agentTypingMessage={getMessageMutation.isLoading ? getMessageMutation.variables?.senderName : undefined}
        />
      </div>
    </div>
  )
}
