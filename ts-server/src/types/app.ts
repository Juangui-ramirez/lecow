/**
 * Apps types, entities, dtos, etc...
 */

import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import type { PoolClient } from "pg";

/// Request/Response
export type Database = PoolClient;
export type Request = ExpressRequest & {
  dbClient: Database;
};
export type Response = ExpressResponse;

/// Entities
export interface UserEntity {
  id: number;
  name: string;
  email: string;
}
