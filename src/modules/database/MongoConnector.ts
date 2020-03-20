import mongoose, { Connection } from 'mongoose'
import Logger from '@/modules/log/Logger'

export default class MongoConnector {
  /**
   * Singleton instance
   */
  private static _instance: MongoConnector

  private _conn: Connection

  /**
   * Get singleton instance
   *
   * @constructor
   */
  public static get I(): MongoConnector {
    if (this._instance === undefined) {
      this._instance = new this()
    }

    return this._instance
  }

  /**
   * Private constructor for singleton pattern
   */
  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public get conn(): Connection {
    return this._conn
  }

  /**
   * Connect to database.
   */
  public async connect(): Promise<void> {
    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      serverSelectionTimeoutMS: 100
    }

    // connect to mongodb
    await mongoose.connect(uri, options)

    // listen mongoose error after initial connection
    // mongoose will attempt to reconnect
    mongoose.connection.on('error', err => {
      Logger.I.log(
        'error',
        `mongoose error occurred after initial connection: ${err}`
      )
    })

    this._conn = mongoose.connection
  }

  /**
   * Close the connection.
   */
  public async close(): Promise<void> {
    await mongoose.connection.close(false, () => {
      Logger.I.log('info', 'mongoose connection is closed')
    })

    this._conn = undefined
  }
}
