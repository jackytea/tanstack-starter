import { FC, ReactNode } from 'react'
import { Footer } from '@/components/Footer/Footer'
import { NavBar } from '@/components/NavBar/NavBar'

const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="grid h-screen w-full grid-rows-[auto_1fr_auto] bg-white dark:bg-stone-950">
      <NavBar />
      <div className="h-14 w-full" />
      <div className="container">
        <div className="h-full border-gray-200 border-x p-4 dark:border-stone-800">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export { AppLayout }
