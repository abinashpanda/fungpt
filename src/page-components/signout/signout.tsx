import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { signOut } from 'next-auth/react'

export default function Signout() {
  const signOutMutation = useMutation(() => signOut({ redirect: true, callbackUrl: '/' }))

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="text-base">Do you want to sign out?</div>
      <Button
        type="primary"
        onClick={() => {
          signOutMutation.mutate()
        }}
        loading={signOutMutation.isLoading}
        disabled={signOutMutation.isLoading}
      >
        Sign Out
      </Button>
    </div>
  )
}
