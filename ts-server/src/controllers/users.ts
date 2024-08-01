import { Request, Response } from "../types/app";
import Service from "../services/users";

export async function getAllUsers(req: Request, res: Response) {
  const service = new Service(req.dbClient);
  const result = await service.getAll();
  res.json(result);
}
