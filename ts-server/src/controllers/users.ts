import { Request, Response, UserEntity } from "../types/app";
import Service from "../services/users";
import { HTTP_CREATED, HTTP_OK } from "../lib/httpCodes";

export async function getAllUsers(req: Request, res: Response) {
  const service = new Service(req.dbClient);
  const result = await service.getAll();
  res.status(HTTP_OK).json(result);
}

export async function createUser(req: Request, res: Response) {
  const service = new Service(req.dbClient);
  const newUser = await service.create(req.body as UserEntity);
  res.status(HTTP_CREATED).json(newUser);
}
