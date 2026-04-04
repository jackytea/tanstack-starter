import { createServerOnlyFn } from '@tanstack/react-start'
import { Resend } from 'resend'

const emailClient = createServerOnlyFn(() => {
  return new Resend(process.env.RESEND_API_KEY as string)
})()

export { emailClient }
