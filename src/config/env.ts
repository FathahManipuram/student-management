import dotenv from 'dotenv'
dotenv.config()



type NodeEnvironment= "development" | "production" | "test"

interface Environment{
	PORT: number
	NODE_ENV: NodeEnvironment
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


function loadEnvironment(): Environment{
	const nodeEnv= process.env.NODE_ENV ?? "development"
	const port= validatePort(process.env.PORT)

	return {
		PORT: port,
		NODE_ENV: validateNodeEnvironment(nodeEnv)
	}
}

export const env: Readonly<Environment>= Object.freeze(
	loadEnvironment()
)