/**
 * Internal type to support middlewares, not to be used in app code
 */

import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import type { PoolClient } from "pg";

export type Request = ExpressRequest & {
  dbClient?: PoolClient;
  doTransaction?: boolean;
};

export type Response = ExpressResponse;
