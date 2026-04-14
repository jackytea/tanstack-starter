const destroySession = () => {
  sessionStorage.clear()

  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    if (cookie.trim().startsWith(import.meta.env.VITE_LOCALE_COOKIE as string)) {
      continue
    }

    const equal = cookie.indexOf('=')
    const name = equal > -1 ? cookie.substring(0, equal) : cookie

    document.cookie = name + `=;expires=${import.meta.env.VITE_COOKIE_EXPIRY_DATE as string}`
  }
}

export { destroySession }
