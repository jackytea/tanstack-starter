import { ReactNode } from 'react'
import { LANGUAGES } from '@/constants/lang.constants'
import { Language } from '@/types/language.type'

const langKey = 'lang' as const

const languageOptions: {
  [x: string]: {
    name: string
    flag: ReactNode
    language: Language
  }
} = {
  [LANGUAGES.ENGLISH]: {
    name: 'English',
    language: LANGUAGES.ENGLISH,
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
        <path
          fill="#C8102E"
          d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
        />
        <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
        <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
      </svg>
    )
  },
  [LANGUAGES.FRENCH]: {
    name: 'Français',
    language: LANGUAGES.FRENCH,
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-fr" viewBox="0 0 640 480">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#000091" d="M0 0h213.3v480H0z" />
        <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
      </svg>
    )
  },
  [LANGUAGES.CHINESE]: {
    name: '中文',
    language: LANGUAGES.CHINESE,
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="flag-icons-cn"
        viewBox="0 0 640 480"
      >
        <defs>
          <path id="cn-a" fill="#ff0" d="M-.6.8 0-1 .6.8-1-.3h2z" />
        </defs>
        <path fill="#ee1c25" d="M0 0h640v480H0z" />
        <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(71.9991 0 0 72 120 120)" />
        <use
          xlinkHref="#cn-a"
          width="30"
          height="20"
          transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"
        />
        <use
          xlinkHref="#cn-a"
          width="30"
          height="20"
          transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"
        />
        <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)" />
        <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)" />
      </svg>
    )
  }
}

export { langKey, languageOptions }
