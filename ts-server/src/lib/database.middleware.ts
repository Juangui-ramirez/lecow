import { NextFunction } from "express";
import { Pool } from "pg";
import { Request, Response } from "../types/internal";

const pool = new Pool({
  // same as
  // user: process.env.PGUSER,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
});

const requireTransactionMap: Record<string, boolean> = {
  POST: true,
  PUT: true,
  DELETE: true,
};

export async function connectDatabase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    req.dbClient = await pool.connect();
    req.doTransaction = requireTransactionMap[req.method];
    if (req.doTransaction) {
      await req.dbClient.query("BEGIN");
    }
    console.info("database connected");
    next();
  } catch (err) {
    res.status(503).end();
    next(err);
  }
}

export async function commitDatabase(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.doTransaction && req.dbClient) {
    await req.dbClient.query("COMMIT");
  }
  req.dbClient?.release();
  delete req.dbClient;
  delete req.doTransaction;
  console.info("database disconnected");
  next();
}

type InternalError = Error & {
  isApplicationError?: boolean;
  errorCode?: number;
};

export async function rollbackDatabase(
  err: InternalError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.doTransaction && req.dbClient) {
      console.info("rollback transaction!");
      await req.dbClient.query("ROLLBACK");
    }
  } finally {
    req.dbClient?.release();
    delete req.dbClient;
    delete req.doTransaction;
  }

  console.info("--- ERROR ---");
  console.info(`${req.method} ${req.path}`);
  console.error(err);
  let errorCode = 500;
  if (err.isApplicationError === true) {
    errorCode = err.errorCode ?? errorCode;
  }

  res.status(errorCode).json({
    error: err.message || "Cant process your request",
  });
  next(err);
}
