import { smtp } from '../config/config'
import nodemailer = require('nodemailer')

const { secure, user, pass, tls } = smtp

const transport = nodemailer.createTransport({
  service: 'gmail',
  secure,
  auth: { user, pass },
  tls
})

export default transport
