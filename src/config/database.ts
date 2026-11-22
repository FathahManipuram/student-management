// Prisma


import { PrismaClient } from "../generated/prisma/client.js";
import { AppError } from "../shared/errors/AppError.js";
import { env } from "./env.js";
import {PrismaMariaDb} from "@prisma/adapter-mariadb"

const databaseUrl= new URL(env.DATABASE_URL)

const adapter= new PrismaMariaDb({
	host: databaseUrl.hostname,
	port: databaseUrl.port ? Number(databaseUrl.port) :3306,
	user: decodeURIComponent(databaseUrl.username),
	password: decodeURIComponent(databaseUrl.password),
	database: decodeURIComponent(databaseUrl.pathname.replace(/^\/+/, "")),

	connectionLimit: 5
})


const error= new AppError("student not found", 404)
console.log(error)
console.log(error.message);
console.log(error.statusCode);
console.log(error.name);
console.log(error.isOperational);

export const prisma= new  PrismaClient({
	adapter
})