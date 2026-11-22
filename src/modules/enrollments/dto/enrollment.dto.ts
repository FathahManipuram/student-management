import { EnrollmentStatus } from "../../../generated/prisma/enums.js";
import { Enrollment } from "../Enrollment.js";

export type CreateEnrollmentInput= Pick<Enrollment, "studentId" | "courseId" >

export interface UpdateEnrollMentInput{
	status: EnrollmentStatus
}