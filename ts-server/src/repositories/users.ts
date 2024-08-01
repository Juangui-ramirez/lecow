import { USERS_GET_ALL } from "../lib/queries";
import { Database, UserEntity } from "../types/app";

export default class Repository {
  dbClient: Database;
  constructor(dbClient: Database) {
    this.dbClient = dbClient;
  }

  async getAll(): Promise<UserEntity[]> {
    const { rows } = await this.dbClient.query(USERS_GET_ALL);
    return rows as UserEntity[];
  }
}
