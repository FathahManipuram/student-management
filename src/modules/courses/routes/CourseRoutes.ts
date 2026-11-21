import { Router } from "express";
import { CourseController } from "../controllers/CourseController.js";

export const createCourseRoutes=(
	courseController: CourseController
): Router =>{
	const router= Router()

	router.get("/", courseController.getAllCourse);
	router.get("/:id", courseController.getCourseById)
	router.post("/", courseController.createCourse)
	router.patch("/:id", courseController.updateCourse)
	router.delete("/:id", courseController.deleteCourse)

	return router
}