import { Router } from "express";
import { TeacherController } from "../controllers/TeacherController.js";

export function createTeacherRoutes(teacherController: TeacherController): Router {
    const router = Router();

    router.get("/", teacherController.getAllTeachers)
    router.get("/:id", teacherController.getTeacherById)
    router.post("/", teacherController.createTeacher)
    router.patch("/:id", teacherController.updateTeacher)
    router.delete("/:id", teacherController.deleteTeacher)

    return router;
}