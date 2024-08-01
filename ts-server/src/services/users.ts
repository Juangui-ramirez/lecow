import UserRepo from "../repositories/users";
import { Database, UserEntity } from "../types/app";

export default class Service {
  userRepo: UserRepo;
  constructor(dbClient: Database) {
    this.userRepo = new UserRepo(dbClient);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepo.getAll();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepo.create(user);
  }
}
