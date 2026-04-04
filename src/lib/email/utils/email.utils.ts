import { config as dotEnvConfig } from 'dotenv'
import { emailClient } from '@/email/config/email.config'

dotEnvConfig({ quiet: true })

const sendEmail = async (from: string, to: string[], name: string) => {
  const { error } = await emailClient.emails.send({
    to,
    from,
    template: {
      id: process.env.RESEND_TEMPLATE_ID as string,
      variables: {
        NAME: name
      }
    }
  })

  return error === null
}

export { sendEmail }
