import '../util/global'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.scss'
import Settings from '../util/settings'

const queryClient = new QueryClient()

function MyApp({
  Component,
  pageProps
}: {
  Component: React.FC
  pageProps: any
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Settings.Provider>
        <Component {...pageProps} />
      </Settings.Provider>
    </QueryClientProvider>
  )
}

export default MyApp
