// import * as path from 'path'
import * as http from 'http'
import * as https from 'https'
import router from './routes/Router'
import routerAuth from './routes/RouterAuth'
import { env } from './config/env'
// import history = require('connect-history-api-fallback')
import express = require('express')
import cors = require('cors')

class App {
  public express: express.Application
  private port: number

  constructor () {
    this.port = env.port
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private routes (): void {
    this.express.use(routerAuth)
    this.express.use(router)
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  public server (): http.Server | https.Server {
    return http.createServer(this.express)
  }

  public apiPort (): number {
    return this.port
  }
}

export default App
