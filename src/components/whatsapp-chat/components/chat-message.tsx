import clsx from 'clsx'
import { ChatMessage as ChatMessageType } from '~/types/chat'

type ChatMessageProps = ChatMessageType & {
  className?: string
  style?: React.CSSProperties
}

export default function ChatMessage({ role, message, senderName, avatar, className, style }: ChatMessageProps) {
  return (
    <div
      className={clsx('relative flex items-start', role === 'user' ? 'justify-end' : 'justify-start', className)}
      style={style}
    >
      {role === 'agent' ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {avatar ? <img src={avatar} alt="avatar" className="mr-1 h-8 w-8 self-end rounded-full" /> : null}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-mr-1 mb-px h-4 w-4 flex-shrink-0 self-end fill-gray-700"
          >
            <path d="M0 19.8907C10.3304 17.2844 16.5714 11.7213 20 0V18.1147C12.2331 19.9685 7.84614 20.1875 0 19.8907Z" />
          </svg>
        </>
      ) : null}
      <div
        className={clsx(
          role === 'user' ? 'bg-teal-700' : 'bg-gray-800',
          'inline-block rounded-md p-2 text-sm font-medium text-white',
        )}
      >
        <div className="mb-2 text-xs font-medium text-teal-600">{senderName}</div>
        <div>{message}</div>
      </div>
      {role === 'user' ? (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-1 mb-px h-4 w-4 self-end fill-teal-800"
        >
          <path d="M20 19.8907C9.66957 17.2844 3.42857 11.7213 0 0V18.1147C7.76691 19.9685 12.1539 20.1875 20 19.8907Z" />
        </svg>
      ) : null}
    </div>
  )
}
