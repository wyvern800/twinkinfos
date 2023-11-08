import { MongoClient, Db } from 'mongodb';
import DatabaseError from './errorTypes/database';

require('dotenv').config();

class MongoDB {
  private static instance: MongoDB;

  private client: MongoClient;

  private db?: Db;

  private constructor() {
    this.client = new MongoClient(process.env.MONGO_CONNECTION_STRING || '');
  }

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  /**
   * Connects to mongo database
   *
   * @param { string } db The database
   * @returns { Db } The database connection
   */
  public async connect(db: string): Promise<Db> {
    if (!this.db) {
      try {
        await this.client.connect();
        this.db = this.client.db(db);
      } catch (error) {
        throw new DatabaseError(`Error connecting to MongoDB: ${error}`);
      }
    }
    return this.db;
  }
}

export default MongoDB;
