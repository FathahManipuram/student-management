import express from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import { requestLogger } from "./middlewares/requestLogger.js"
import { createStudentRoutes } from "./modules/students/routes/StudentRoutes.js"
import { container } from "./di/container.js"

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


app.use("/api/students", createStudentRoutes(container.studentController))

app.use(errorHandler)
export {app}