import MongoConnector from '@/modules/database/MongoConnector'

export default class DBServiceProvider {
  /**
   * Connect to the database and initialize it.
   */
  public static async boot(): Promise<void> {
    await MongoConnector.I.connect()
  }
}
