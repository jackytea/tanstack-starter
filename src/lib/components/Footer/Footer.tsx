import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { APP } from '@/constants/app.constants'
import packageJson from '@/package'

const icons: {
  icon: JSX.Element
  url: string
}[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    url: import.meta.env.VITE_FOOTER_GITHUB_URL as string
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    url: import.meta.env.VITE_FOOTER_LINKEDIN_URL as string
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
    url: import.meta.env.VITE_FOOTER_TWITTER_URL as string
  }
]

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="relative">
      <hr className="absolute w-full border-gray-200 dark:border-stone-800" />
      <footer className="container bg-white dark:bg-stone-950">
        <div className="flex items-center justify-between gap-y-10 border-gray-200 border-x px-4 py-6 dark:border-stone-800">
          <p className="font-semibold text-neutral-500 text-sm tracking-tight sm:text-center dark:text-neutral-400">
            &copy; {new Date().getFullYear()}, {t(APP.NAME)} {packageJson.version}
          </p>
          <div className="flex items-center gap-x-4">
            {icons.map((icon, index) => (
              <a
                target="_blank"
                href={icon.url}
                key={`${icon.url}${index}`}
                rel="noopener noreferrer"
                className="cursor-pointer text-neutral-500 text-xl hover:text-neutral-900 hover:dark:text-white"
              >
                {icon.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export { Footer }
