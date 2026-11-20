import { Enrollment } from "../Enrollment.js";

export interface IEnrollmentRepository {
	findAll(): Promise<Enrollment[]>

	findById(id: number): Promise<Enrollment | null>

	findByStudentId(studentId: number): Promise<Enrollment[]>

	create(Enrollment: Enrollment): Promise<Enrollment>

	update(
		id: number,
		data: Partial<Enrollment>,
	): Promise<Enrollment | null>

	delete(id: number): Promise<boolean>

}