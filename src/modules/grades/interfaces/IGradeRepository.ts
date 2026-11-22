import { Grade } from "../Grade.js";

export interface IGradeRepository {
	findAll(): Promise<Grade[]>

	findById(id: number): Promise<Grade | null>;

	findByEnrollmentId(enrollmentId: number): Promise<Grade[]>

	create(grade: Grade): Promise<Grade>

	update(
		id: number,
		data: Partial<Grade>
		): Promise<Grade | null>

	delete(id: number): Promise<boolean>
}