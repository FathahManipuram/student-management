import { app } from "./app.js";
import { env } from "./config/env.js";

const server= app.listen(env.PORT, ()=>{
	console.log(`Server running on port :${env.PORT}`)
})


function shutdown(signal: string):void{
	console.log(`${signal} recieved. Shutting down server...`)

	server.close((error)=>{
		if(error){
			console.log(`Error during server shutdown: ${error}`)
			process.exitCode=1
			return
		}

		console.log("Server closed successfully")
	})
}


process.on("SIGINT", ()=> shutdown("SIGINT"))
process.on("SIGTERM", ()=> shutdown("SIGTERM"))