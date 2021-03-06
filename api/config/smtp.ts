import * as dotenv from 'dotenv'
dotenv.config()

export const smtp = {
  secure: false,
  user: process.env.EMAIL,
  pass: process.env.PASSWORDSMTP,
  tls: {
    rejectUnauthorized: false
  }
}
