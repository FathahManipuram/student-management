import { Router } from "express";
import { EnrollmentController } from "../controllers/Enrollment.controller.js";

export const createEnrolllmentRoutes= (enrollmentController: EnrollmentController): Router=>{
	const router= Router()


	router.get("/", enrollmentController.getAllEnrollments)
	router.post("/", enrollmentController.createEnrollment)
	router.patch("/:id", enrollmentController.updateEnrollment)
	router.delete("/:id", enrollmentController.deleteEnrollMent)

return router
}