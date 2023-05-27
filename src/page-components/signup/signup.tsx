import { Button, Form, Input, message } from 'antd'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { api } from '~/utils/api'

export default function Signup() {
  const [form] = Form.useForm()

  const signupMutation = api.auth.createUser.useMutation({
    onError: (error) => {
      message.error(error.message ?? 'Error creating user')
    },
    onSuccess: () => {
      signIn('credentials', {
        username: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
        callbackUrl: '/',
        redirect: true,
      })
    },
  })

  return (
    <>
      <Head>
        <title>Signup</title>
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
              <div className="text-lg font-semibold">Signup</div>
              <div className="text-xs font-medium text-content-secondary">Create your account to get started</div>
            </div>
          </div>
          {signupMutation?.error ? (
            <div className="mb-4 flex items-center space-x-2 rounded-md bg-red-500 p-4 text-sm text-white">
              <HiExclamationTriangle className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1">Error creating user. {signupMutation.error.message}</div>
            </div>
          ) : null}
          <Form
            form={form}
            layout="vertical"
            initialValues={{ username: '', password: '' }}
            requiredMark={false}
            onFinish={signupMutation.mutate}
            className="mb-8"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
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
              loading={signupMutation.isLoading}
              disabled={signupMutation.isLoading}
            >
              Sign Up
            </Button>
          </Form>
          <div
            className="relative mb-8 border-t before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-2 before:py-1 before:text-xs before:font-medium before:text-content-secondary before:content-[attr(data-before)]"
            data-before="Already have an account"
          />
          <Link href="/api/auth/signin">
            <Button htmlType="button" block>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
