import { AppError } from "../../../shared/errors/AppError.js";
import { ICourseRepository } from "../../courses/interfaces/ICourseRepository.js";
import { IStudentRepository } from "../../students/interfaces/IStudentRepository.js";
import { Enrollment } from "../Enrollment.js";
import { IEnrollmentRepository } from "../interfaces/IEnrollmentRepository.js";

export class EnrollmentService {
    constructor(
        private readonly enrollmentRepository: IEnrollmentRepository,
        private readonly studentRepository: IStudentRepository,
        private readonly courseRepository: ICourseRepository
    ) {}

	async getAllEnrollments(): Promise<Enrollment[]> {
        return this.enrollmentRepository.findAll();
    }

    

    async createEnrollment(
        studentId: number,
        courseId: number
    ): Promise<Enrollment> {
        const student = await this.studentRepository.findById(studentId);
        if (!student) throw new AppError("Student not found", 404);

        const course = await this.courseRepository.findById(courseId);
        if (!course) throw new AppError("Course not found", 404);

        const existingEnrollments = await this.enrollmentRepository.findAll();

        const duplicate = existingEnrollments.some(
            enrollment =>
                enrollment.studentId === studentId &&
                enrollment.courseId === courseId &&
                enrollment.status !== "CANCELLED"
        );

        if (duplicate) {
            throw new AppError("Student is already enrolled in this course", 409);
        }

        const nextId = existingEnrollments.reduce(
            (max, enrollment) => Math.max(max, enrollment.id), 0
        ) + 1;

        const enrollment = new Enrollment(nextId, studentId, courseId);
        return this.enrollmentRepository.create(enrollment);
    }



    async updateEnrollmentStatus(
        id: number,
        data: Enrollment
    ): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findById(id)


        if (!enrollment) throw new AppError("Enrollment not found", 404)

        const updated = await this.enrollmentRepository.update(id, data)

        if (!updated) throw new AppError("Enrollment not found", 404);

        return updated;
    }



    async deleteEnrollment(id: number): Promise<void> {
        const enrollment = await this.enrollmentRepository.findById(id);
        if (!enrollment) throw new AppError("Enrollment not found", 404);

        await this.enrollmentRepository.delete(id);
    }

}