import express, { Express } from 'express'
import mainRouter from '@@/routes/api'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

export default class RouteServiceProvider {
  /**
   * Basic middleware list which is globally applied to router.
   * You can add your own basic middleware to here or remove unused things.
   */
  private static basicMiddleware = [
    cors(), // you should your own cors options (see https://github.com/expressjs/cors)
    helmet(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ]

  /**
   * Error handler middleware list which handle http errors.
   * You can add your own error middleware to here or remove unused things.
   */
  // private static errorMiddleware = []

  /**
   * Boot main router.
   *
   * If you running this app behind a proxy, use trust proxy option.
   * (see http://expressjs.com/en/guide/behind-proxies.html#express-behind-proxies)
   */
  public static boot(): Express {
    const app = express()
    app.set('trust proxy', true)
    app.use(this.basicMiddleware)
    app.use('/v1', mainRouter) // api versioning
    // app.use(this.errorMiddleware)

    return app
  }
}
