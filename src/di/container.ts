import { CourseRepository } from "../modules/courses/repositories/CourseRepository.js";
import { CourseService } from "../modules/courses/services/CourseService.js";
import { EnrollmentRepository } from "../modules/enrollments/repositories/EnrollmentRepository.js";
import { EnrollmentService } from "../modules/enrollments/services/EnrollmentService.js";
import { GradeRepository } from "../modules/grades/repositories/GradeRepository.js";
import { GradeService } from "../modules/grades/services/GradeServices.js";
import { StudentController } from "../modules/students/controllers/StudentController.js";
import { StudentRepository } from "../modules/students/repositories/StudentRepository.js";
import { StudentService } from "../modules/students/services/StudentService.js";
import { TeacherRepository } from "../modules/teachers/repositories/TeacherRepository.js";
import { TeacherService } from "../modules/teachers/services/TeacherServices.js";

const studentRepository= new StudentRepository()
const teacherRepository = new TeacherRepository()
const courseRepository = new CourseRepository()
const enrollmentRepository = new EnrollmentRepository()
const gradeRepository = new GradeRepository()



const studentService= new StudentService(studentRepository)
const teacherService = new TeacherService(teacherRepository);
const courseService = new CourseService(courseRepository)
const enrollmentService=new EnrollmentService(
	enrollmentRepository,
    studentRepository,
    courseRepository
)
const gradeService = new GradeService(
    gradeRepository,
    enrollmentRepository
)

const studentController= new StudentController(studentService)

export const container={
	studentRepository,
	teacherRepository,
	courseRepository,
	enrollmentRepository,
	gradeRepository,



	studentService,
	teacherService,
	courseService,
	enrollmentService,
	gradeService,

	studentController,

}