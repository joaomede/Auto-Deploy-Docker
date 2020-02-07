import { config } from '../config/config'
import nodemailer = require('nodemailer')

const { host, secure, user, pass, tls } = config

const transport = nodemailer.createTransport({
  service: 'gmail',
  host,
  secure,
  auth: { user, pass },
  tls
})

export default transport
