'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {children: React.ReactNode}

const client = new QueryClient();

function ReactQueryProvider({children}: Props) {
  return (
    <div>
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default ReactQueryProvider