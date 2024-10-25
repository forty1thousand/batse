import { DB } from "@/app/lib/types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

var pool: Pool;
var db: Kysely<DB>;

let createPool = () => {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  });
};


pool ??= createPool();

let createDB = () => {
  return new Kysely<DB>({ dialect: new PostgresDialect({ pool }) })
}

db ??= createDB()

export { pool, db };
