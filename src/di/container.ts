import { StudentController } from "../modules/students/controllers/StudentController.js";
import { StudentRepository } from "../modules/students/repositories/StudentRepository.js";
import { StudentService } from "../modules/students/services/StudentService.js";

const studentRepository= new StudentRepository()

const studentService= new StudentService(studentRepository)

const studentController= new StudentController(studentService)

export const container={
	studentRepository,
	studentService,
	studentController
}