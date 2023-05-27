import { type AppProps } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ConfigProvider } from 'antd'
import Head from 'next/head'
import { api } from '~/utils/api'
import '~/styles/globals.css'
import { ANTD_THEME } from '~/styles/theme'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session | null }>) {
  return (
    <>
      <Head>
        {/* TODO: Replace Favicon with App Icon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* TODO: Replace App with App Name */}
        <title>FunGPT</title>
      </Head>
      <ConfigProvider theme={ANTD_THEME}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ConfigProvider>
    </>
  )
}

export default api.withTRPC(App)
