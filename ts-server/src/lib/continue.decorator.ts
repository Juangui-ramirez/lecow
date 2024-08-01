import type { RequestHandler, NextFunction, Request, Response } from "express";
import type {
  Request as AppRequest,
  Response as AppResponse,
} from "../types/app";

type AppHandler = (req: AppRequest, res: AppResponse) => Promise<void> | void;

/**
 * Request handler wrapper.
 *
 * Ensure next handler is called for sync and async functions.
 *
 * @param fn internal handler
 * @returns Wrapped handler
 */
function continuator(fn: AppHandler): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    const result = fn(req as AppRequest, res as AppResponse);
    if (typeof result?.finally !== "function") {
      next();
    } else {
      result.then(next, next);
    }
  };
}

export default continuator;
