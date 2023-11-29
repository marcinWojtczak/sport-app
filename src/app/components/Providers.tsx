'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers