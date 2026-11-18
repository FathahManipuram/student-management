import express from "express"

const app= express()


app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))


app.get("/api/health", (_req, res)=>{
	res.status(200).json({
		success: true,
		message: "Student management API is running",
		timeStamp: new Date().toISOString()
	})
})

export {app}