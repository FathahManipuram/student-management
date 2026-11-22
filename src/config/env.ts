import dotenv from 'dotenv'
dotenv.config()



type NodeEnvironment= "development" | "production" | "test"

interface Environment{
	PORT: number
	NODE_ENV: NodeEnvironment
	DATABASE_URL: string
}

function validateNodeEnvironment(value: string): NodeEnvironment{
	const allowedEnvironMents: NodeEnvironment[]=[
		"development",
		"production",
		"test"
	]

	if(!allowedEnvironMents.includes(value as NodeEnvironment)){
		throw new Error(`Invalid NODE_ENV: ${value}.`)
	}
	return value as NodeEnvironment
}


function validatePort(value: string | undefined): number{
	if(value===undefined){
		return 5000
	}
	const port = Number(value)

	if(!Number.isInteger(port) || port <1 ||port >65535){
		throw new Error(`Invalid port value: ${value}`)
	}
return port

}

function validateDatabaseUrl(value: string | undefined): string{
	if(!value){
		throw new Error("Database url is required")
	}

	let databaseUrl: URL

	try{
		databaseUrl= new URL(value)
	}catch{
		 throw new Error("DATABASE_URL must be a valid URL");
	}

	if(databaseUrl.protocol !=="mysql:"){
		throw new Error("DATABASE_URL must use the mysql protocol")
	}

	if(
		!databaseUrl.hostname ||
		!databaseUrl.username ||
		!databaseUrl.password ||
		databaseUrl.pathname==="/" ||
		!databaseUrl.pathname
	){
		throw new Error(
			  "DATABASE_URL must contain host, username, password, and database name"
		)
	}


	if(databaseUrl.port !=="" &&
		(!Number.isInteger(Number(databaseUrl.port))||
		 Number(databaseUrl.port) < 1 ||
            Number(databaseUrl.port) > 65535)
		){
			throw new Error("DATABASE_URL contains an invalid port");
		}
	return value


}


function loadEnvironment(): Environment{
	const nodeEnv= process.env.NODE_ENV ?? "development"
	const port= validatePort(process.env.PORT)

	return {
		PORT: port,
		NODE_ENV: validateNodeEnvironment(nodeEnv),
		DATABASE_URL: validateDatabaseUrl(process.env.DATABASE_URL)
	}
}

export const env: Readonly<Environment>= Object.freeze(
	loadEnvironment()
)