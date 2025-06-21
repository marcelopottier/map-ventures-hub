
import { PublicHeader } from "./PublicHeader"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
