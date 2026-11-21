import { Enrollment } from "../Enrollment.js"

export interface EnrollmentResponse{
	id: number,
	studentId: number,
	courseId: number,
	status: string
}


export const toEnrollmentResponse=(
	enrollment: Enrollment
): EnrollmentResponse=>({
	id: enrollment.id,
	studentId: enrollment.studentId,
	courseId: enrollment.courseId,
	status: enrollment.status
})