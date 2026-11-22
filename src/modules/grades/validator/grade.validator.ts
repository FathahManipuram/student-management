import { AppError } from "../../../shared/errors/AppError.js";
import { createGradeInput, updateGradeInput } from "../dto/grade.dto.js";

type RequestBody= Record<string, unknown>;


function isRequestBody(value: unknown): value is RequestBody{
	return typeof value==="object"  && value !==null && !Array.isArray(value)
}


export function validateCreateGrade(body: unknown): createGradeInput{
	if(!isRequestBody(body)){
		throw new AppError("requset body must be an object", 400)
	}

	const{enrollmentId, assessmentName, score, maxScore }= body

	if(typeof enrollmentId !== "number" || !Number.isInteger(enrollmentId) || enrollmentId<=0){
		throw new AppError("Valid enrollment ID is required", 400);
	}

	if(typeof assessmentName !== "string" || !assessmentName.trim()){
		 throw new AppError("Assessment name is required", 400);
	}


	if(typeof score!=="number" || !Number.isFinite(score)){
		throw new AppError("Score must be a valid number", 400);
	}

	if(typeof maxScore!=="number" || !Number.isFinite(maxScore) || maxScore<=0){
		throw new AppError("Maximum score must be greater than zero", 400);
	}

	if(score < 0 || score> maxScore){
		 throw new AppError(`Score must be between 0 and ${maxScore}`, 400);
	}

	return {
		enrollmentId,
		assessmentName,
		score,
		maxScore
	}

}


export function validateUpdateGrade(body: unknown): updateGradeInput{
	if(!isRequestBody(body)){
		 throw new AppError("Request body must be an object", 400);
	}

	if(Object.keys(body).length !==1 || !("score" in body)){
		throw new AppError("Only the score field can be updated", 400);
	}

	if(typeof body.score !== "number" || !Number.isFinite(body.score)){
		 throw new AppError("Score must be a valid number", 400);
	}

	if(body.score < 0){
		 throw new AppError("Score cannot be negative", 400);
	}

	return {score: body.score}
}