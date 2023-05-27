import { signIn } from 'next-auth/react'
import { Button, Form, Input, message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { HiExclamationTriangle } from 'react-icons/hi2'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export type LoginProps = {
  csrfToken: string
}

export default function Login({ csrfToken }: LoginProps) {
  const router = useRouter()

  const signinMutation = useMutation(
    (values: { username: string; password: string; csrfToken: string }) =>
      signIn('credentials', { ...values, callbackUrl: '/', redirect: false }),
    {
      onSuccess: (result) => {
        if (!result?.ok) {
          message.error('Error logging in')
        } else {
          router.replace('/')
        }
      },
    },
  )

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div
        className="relative flex h-screen items-center justify-center"
        style={{
          background: 'url("/login-pattern.jpg")',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
        <div className="relative z-10 w-full max-w-md rounded-md bg-white p-8 shadow">
          <div className="mb-8 flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full border-[8px] border-gray-900" />
            <div>
              <div className="text-lg font-semibold">Login</div>
              <div className="text-xs font-medium text-content-secondary">Login with email and password</div>
            </div>
          </div>
          {signinMutation?.data?.error === 'CredentialsSignin' ? (
            <div className="mb-4 flex items-center space-x-2 rounded-md bg-red-500 p-4 text-sm text-white">
              <HiExclamationTriangle className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">Error Logging In. Please check your credentials</div>
            </div>
          ) : null}
          <Form
            layout="vertical"
            initialValues={{ csrfToken, username: '', password: '' }}
            onFinish={signinMutation.mutate}
            requiredMark={false}
            className="mb-8"
          >
            <Form.Item hidden name="csrfToken">
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="mb-2"
              loading={signinMutation.isLoading}
              disabled={signinMutation.isLoading}
            >
              Sign in
            </Button>
          </Form>
          <div
            className="relative mb-8 border-t before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-2 before:py-1 before:text-xs before:font-medium before:text-content-secondary before:content-[attr(data-before)]"
            data-before="Don't have an account"
          />
          <Link href="/auth/signup">
            <Button htmlType="button" block>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
