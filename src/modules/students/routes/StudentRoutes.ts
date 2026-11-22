import { Router } from "express";
import { StudentController } from "../controllers/StudentController.js";

export const createStudentRoutes = (studentController: StudentController):Router =>{

	const router= Router()

	router.get("/", studentController.getAllStudents)
	router.get("/:id", studentController.getStudentById)
	router.post("/", studentController.createStudent)
	router.patch("/:id", studentController.updateStudent)
	router.delete("/:id", studentController.deleteStudent)

	return router

}