import express from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import { requestLogger } from "./middlewares/requestLogger.js"

const app= express()


app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))
app.use(requestLogger)

app.get("/api/health", (_req, res)=>{
	res.status(200).json({
		success: true,
		message: "Student management API is running",
		timeStamp: new Date().toISOString()
	})
})


app.use(errorHandler)
export {app}