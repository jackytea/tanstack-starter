declare module '@/i18n/compiled/runtime' {
  const getLocale: () => string
  const setLocale: (locale: string) => void

  export { getLocale, setLocale }
}

declare module '@/i18n/compiled/messages' {
  const m: Record<string, (params?: Record<string, unknown>) => string>

  export { m }
}

declare module '@/i18n/compiled/server' {
  const paraglideMiddleware: (
    request: Request,
    resolve: (context: { request: Request }) => Response | Promise<Response>
  ) => Promise<Response>

  export { paraglideMiddleware }
}
