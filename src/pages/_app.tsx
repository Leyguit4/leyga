import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
