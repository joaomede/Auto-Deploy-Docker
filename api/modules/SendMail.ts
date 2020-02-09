import mail from '../modules/Mailer'
import { smtp } from '../config/smtp'

export default new class SendMail {
  public async sendEmail (email: string, context: string, errorMessage: string): Promise<void> {
    try {
      await mail.sendMail({
        to: email,
        from: `"Auto Deploy" <${smtp.user}>`,
        subject: 'Auto Deploy Docker Result',
        text: context,
        html: `<div>${context}<div>`
      })
    } catch (error) {
      if (error) {
        console.log(error)
        throw new Error(errorMessage)
      }
    }
  }
}()
