import { AppError } from "../../../shared/errors/AppError.js";
import { CreateStudentInput } from "../dto/student.dto.js";

type RequestBody= Record<string, unknown>;

function isRequestBody(value: unknown): value is RequestBody{
	return (
		typeof value==="object" && 
		value !== null && 
		!Array.isArray(value)
	)
}

function validateEmail(email: string): boolean{
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}



export function validateCreateStudent(body: unknown): CreateStudentInput{
	if(!isRequestBody(body)){
		throw new AppError("Request body must be an object", 400)
	}

	const {email, admissionNumber, firstName, lastName}= body

	if(
		typeof email !=="string" ||
		typeof admissionNumber !=="string" ||
		typeof firstName !== "string" ||
		typeof lastName !=="string"
	){
		throw new AppError("All student feild must be string", 400);
	}

	if(!validateEmail(email)){
		throw new AppError("A valid email address is required", 400)
	}

	if(!admissionNumber.trim() ||
	!firstName.trim() ||
	!lastName.trim()
	){
		throw new AppError("admission number, firstName, lastName are required", 400)
	}

	return {
		email: email.trim().toLowerCase(),
		admissionNumber: admissionNumber.trim(),
		firstName: firstName.trim(),
		lastName: lastName.trim()
	}
}