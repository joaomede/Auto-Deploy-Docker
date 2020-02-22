import { smtp } from '../config/smtp'
import nodemailer = require('nodemailer')

class SendMail {
  /**
   * Send a message to an email
   *
   * @param {string} email Recipient's Email
   * @param {string} context Message context
   * @param {string} errorMessage Error message
   * @returns {Promise<void>}
   * @memberof SendMail
   */
  public async sendEmail (email: string, context: string, errorMessage: string): Promise<void> {
    const { secure, user, pass, tls } = smtp
    const mail = nodemailer.createTransport({
      service: 'gmail',
      secure,
      auth: { user, pass },
      tls
    })
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
}

export default new SendMail()
