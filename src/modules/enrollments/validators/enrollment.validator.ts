import { EnrollmentStatus } from "../../../generated/prisma/enums.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { CreateEnrollmentInput, UpdateEnrollMentInput } from "../dto/enrollment.dto.js";

type RequestBody= Record<string, unknown>;

function isRequestBody(value: unknown): value is RequestBody{
	return typeof value==="object" &&
	value !==null &&
	!Array.isArray(value)
}


const validStatuses: EnrollmentStatus[]=[
	"ACTIVE",
	"COMPLETED",
	"DROPPED"
]


export function validateCreateEnrollment(body: unknown):CreateEnrollmentInput{

	if(!isRequestBody(body)){
		throw new AppError("Request body must be object", 400)
	}

	const {studentId, courseId}= body

	if(
		typeof studentId !=="number" ||
		!Number.isInteger(studentId) ||
		studentId <=0 ||
		typeof courseId !=="number" ||
		!Number.isInteger(courseId) ||
		courseId <=0

	){
		throw new AppError("Valid studentId and courseId are required", 400)
	}

return {studentId, courseId}
}


export function validateUpdateEnrollment(body: unknown): UpdateEnrollMentInput{
	if(!isRequestBody(body)){
		throw new AppError("Request body mut be an object", 400)
	}

	if(typeof body.status!=="string" || !validStatuses.includes(body.status as EnrollmentStatus)){
		throw new AppError("Invalid enrollment status", 400)
	}

	return {status: body.status as EnrollmentStatus}
}