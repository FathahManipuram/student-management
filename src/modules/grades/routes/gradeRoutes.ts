import { Router } from "express";
import { GradeController } from "../controllers/grade.controller.js";

export const createGradeRoutes= (gradeController: GradeController):Router =>{
	const router= Router()


	router.get("/:enrollmentId", gradeController.getGradeByEnrollment)
	router.post("/", gradeController.createGrade)
	router.patch("/:id", gradeController.updateGrade)
	router.delete("/:id", gradeController.deleteGrade)

	return router
}