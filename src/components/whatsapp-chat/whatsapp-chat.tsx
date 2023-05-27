import Image from 'next/image'
import { HiOutlineCurrencyRupee } from 'react-icons/hi2'
import { IoIosArrowBack } from 'react-icons/io'
import {
  IoAddOutline,
  IoCallOutline,
  IoCameraOutline,
  IoDocumentOutline,
  IoMicOutline,
  IoVideocamOutline,
} from 'react-icons/io5'
import clsx from 'clsx'
import { Scrollbars } from 'react-custom-scrollbars-2'
import ChatMessage from './components/chat-message'
import { ChatMessage as ChatMessageType, WhatsappChatContextData } from '~/types/chat'

type WhatsappChatProps = {
  chatContext?: WhatsappChatContextData
  agentTypingMessage?: string
  messages: ChatMessageType[]
  className?: string
  style?: React.CSSProperties
}

export default function WhatsappChat({
  chatContext,
  agentTypingMessage,
  messages,
  className,
  style,
}: WhatsappChatProps) {
  return (
    <div
      className={clsx(
        "relative h-[720px] w-[360px] overflow-hidden rounded-md border border-gray-700 bg-gray-950 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/chat-bg.png')] before:opacity-10",
        className,
      )}
      style={style}
    >
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center bg-gray-900 px-4 py-3">
        <IoIosArrowBack className="mr-4 h-5 w-5 text-blue-500" />
        <Image
          src="https://i.pinimg.com/564x/bd/50/62/bd5062ede981ae37aaf4e1fe3ba9e714.jpg"
          className="mr-4 rounded-full"
          alt="Image"
          width={32}
          height={32}
        />
        <div className="mr-4 flex-1 truncate">
          <div className="truncate text-sm font-medium text-gray-50">{chatContext?.groupName ?? 'Group Name'}</div>
          <div className="truncate text-xs text-gray-500">
            {agentTypingMessage
              ? `${agentTypingMessage} is typing...`
              : chatContext?.agents?.map((item) => item.agentName).join(', ') ?? 'Group Members'}
          </div>
        </div>
        <IoVideocamOutline className="mr-4 h-6 w-6 text-blue-500" />
        <IoCallOutline className="h-5 w-5 text-blue-500" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center bg-gray-900 px-4 py-2">
        <IoAddOutline className="mr-3 h-5 w-5 text-blue-500" />
        <div className="mr-4 flex flex-1 items-center justify-end rounded-full border border-gray-700 bg-gray-800 px-2 py-1">
          <IoDocumentOutline className="h-5 w-5 text-blue-500" />
        </div>
        <HiOutlineCurrencyRupee className="mr-3 h-6 w-6 text-blue-500" />
        <IoCameraOutline className="mr-3 h-5 w-5 text-blue-500" />
        <IoMicOutline className="h-5 w-5 text-blue-500" />
      </div>
      <Scrollbars style={{ width: 360, height: 720 }}>
        <div className="space-y-4 px-4 pb-16 pt-20">
          {messages.map((message, index) => {
            return <ChatMessage key={index} {...message} />
          })}
        </div>
      </Scrollbars>
    </div>
  )
}
