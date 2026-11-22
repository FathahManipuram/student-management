import mysql from "mysql2/promise"
import { env } from "./env.js"

const databaseUrl= new URL(env.DATABASE_URL)

export const pool= mysql.createPool({
	host: databaseUrl.hostname,
	user: databaseUrl.username,
	password: decodeURIComponent(databaseUrl.password),
	database: databaseUrl.pathname.replace(/^\/+/,""),
	port: databaseUrl.port ? Number(databaseUrl.port) : 3306,
	
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,

})

export async function connectDatabase(): Promise<void>{
	const connection= await pool.getConnection()
	try{
		await connection.ping()
		console.log(`Mysql connected successfully`)

	}finally{
		connection.release()
	}
}
