declare module '@/i18n/compiled/runtime' {
  function getLocale(): string
  function setLocale(locale: string): void

  export { getLocale, setLocale }
}

declare module '@/i18n/compiled/messages' {
  const m: Record<string, (params?: Record<string, unknown>) => string>

  export { m }
}

declare module '@/i18n/compiled/server' {
  function paraglideMiddleware(
    request: Request,
    resolve: (context: { request: Request }) => Response | Promise<Response>
  ): Promise<Response>

  export { paraglideMiddleware }
}
