import { Grade } from "../Grade.js";
import { IGradeRepository } from "../interfaces/IGradeRepository.js";
//import { IEnrollmentRepository } from "../../enrollments/interfaces/IEnrollmentRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class GradeService {
    constructor(
        private readonly gradeRepository: IGradeRepository,
        //private readonly enrollmentRepository: IEnrollmentRepository
    ) {}

    async getGradesByEnrollment(enrollmentId: number): Promise<Grade[]> {
        // const enrollment = await this.enrollmentRepository.findById(enrollmentId);
        // if (!enrollment) throw new AppError("Enrollment not found", 404);

        return this.gradeRepository.findByEnrollmentId(enrollmentId);
    }

    async createGrade(
        enrollmentId: number,
        assessmentName: string,
        score: number,
        maxScore: number
    ): Promise<Grade> {
        // const enrollment = await this.enrollmentRepository.findById(enrollmentId);
        // if (!enrollment) throw new AppError("Enrollment not found", 404);

        const grades = await this.gradeRepository.findAll();

        const nextId = grades.reduce(
            (max, grade) => Math.max(max, grade.id), 0
        ) + 1;

        const grade = new Grade(
            nextId,
            enrollmentId,
            assessmentName,
            score,
            maxScore
        );

        return this.gradeRepository.create(grade);
    }

    async updateGrade(id: number, score: number): Promise<Grade> {
        const grade = await this.gradeRepository.findById(id)
        if (!grade) throw new AppError("Grade not found", 404)

        const updated = await this.gradeRepository.update(id, { score });
        if (!updated) throw new AppError("Grade not found", 404);

        return updated;
    }

    async deleteGrade(id: number): Promise<void> {
        const grade = await this.gradeRepository.findById(id);
        if (!grade) throw new AppError("Grade not found", 404);

        await this.gradeRepository.delete(id)
    }
}