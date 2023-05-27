import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'
import type { LoginProps } from '~/page-components/login'
import { authOptions } from '~/server/auth'
import Login from '~/page-components/login'

type LoginPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function LoginPage({ csrfToken }: LoginPageProps) {
  return <Login csrfToken={csrfToken} />
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<LoginProps>> {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      csrfToken: (await getCsrfToken(context))!,
    },
  }
}
