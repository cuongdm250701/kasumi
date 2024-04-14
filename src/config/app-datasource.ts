import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { parse, ConnectionOptions as parseOptions } from 'pg-connection-string';
import { config } from './app';
import * as entities from '../entities/index';
import * as migrations from '../migrations';
dotenv.config();

interface CustomOptions extends parseOptions {
  schema: string;
}

const db = parse(config.databaseUrl as string) as CustomOptions;

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: db.host || undefined,
//   port: Number(db.port) || undefined,
//   username: db.user,
//   password: db.password,
//   database: db.database || undefined,
//   schema: db.schema || 'public',
//   logging: config.hasLog ? true : ['error'],
//   entities: entities,
//   subscribers: [],
//   migrations: migrations,
//   synchronize: false,
// });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  logging: true,
  entities: entities,
  subscribers: [],
  migrations: migrations,
  synchronize: false,
});
export const dbSchema = db.schema || 'public';
