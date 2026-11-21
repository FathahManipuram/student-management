import { RequestHandler } from "express";
import { GradeService } from "../services/GradeServices.js";
import { toGradeResponse } from "../dto/grade.response.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { validateCreateGrade, validateUpdateGrade } from "../validator/grade.validator.js";

export class GradeController{
	constructor(private readonly gradeService: GradeService){}

	getGradeByEnrollment: RequestHandler= async(req, res, next)=>{
		try{
			const enrollmentId= Number(req.params.enrollmentId)

			if(!Number.isInteger(enrollmentId) || enrollmentId<=0){
				 throw new AppError("Invalid enrollment ID", 400);
			}
			const grades= await this.gradeService.getGradesByEnrollment(enrollmentId)

			res.status(200).json({
				success: true,
				message: "Grades retrieved successfully",
				data: grades.map(toGradeResponse)
			})
		}catch(err){
			next(err)
		}
	}

	createGrade: RequestHandler= async(req, res, next)=>{
		try{
			const {enrollmentId, assessmentName, score, maxScore}= validateCreateGrade(req.body)
			const grade= await this.gradeService.createGrade(enrollmentId, assessmentName, score, maxScore)

			res.status(201).json({
				success: true,
				message: "Grade created successfully",
				data: toGradeResponse(grade)
			})
		}catch(err){
			next(err)
		}
	}

	updateGrade: RequestHandler=async(req, res, next)=>{
		try{
			const id= Number(req.params.id)
			
			if(!Number.isInteger(id) || id<=0){
				 throw new AppError("Invalid grade id", 400);
			}

			const data= validateUpdateGrade(req.body)

			const grade= await this.gradeService.updateGrade(id, data.score)

			res.status(200).json({
				success: true, 
				message: "Grade updated successfully",
				data: toGradeResponse(grade)
			})

		}catch(err){
			next(err)
		}
	}


	deleteGrade: RequestHandler= async(req, res, next)=>{
		try{
			const id= Number(req.params.id)
			if(!Number.isInteger(id) || id<=0){
				 throw new AppError("Invalid grade id", 400);
			}

			await this.gradeService.deleteGrade(id)

			res.status(200).json({
				success: true,
				message: "Grade deleted successfully"
			})

		}catch(err){
			next(err)
		}
	}

	
}