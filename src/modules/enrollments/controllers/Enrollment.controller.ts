import { RequestHandler } from "express";
import { EnrollmentService } from "../services/EnrollmentService.js";
import { toEnrollmentResponse } from "../dto/enrollment.response.js";
import { validateCreateEnrollment, validateUpdateEnrollment } from "../validators/enrollment.validator.js";
import { Enrollment } from "../Enrollment.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class EnrollmentController{
	constructor(private readonly enrollmentService: EnrollmentService){}

	getAllEnrollments: RequestHandler =async(_req, res, next)=>{
		try{
			const enrollments= await this.enrollmentService.getAllEnrollments()

			res.status(200).json({
				success: true,
				message: "Enrollments retrieved successully",
				data: enrollments.map(toEnrollmentResponse)
			})
		}catch(err){
			next(err)
		}
	}


	createEnrollment: RequestHandler= async (req, res, next)=>{
		try{

			const data= validateCreateEnrollment(req.body)
			const {studentId, courseId}= data
			const enrollment= await this.enrollmentService.createEnrollment(studentId, courseId)

			res.status(201).json({
				success: true,
				message: "Enrollment created successfully",
				data: toEnrollmentResponse(enrollment)
			})
		}catch(err){
			next(err)
		}
	}


	updateEnrollment: RequestHandler= async(req, res, next)=>{
		try{
			const id= Number(req.params.id)
			if(!Number.isInteger(id) || id<=0){
				throw new AppError("Invalid enrollment id", 400)
			}

			const data= validateUpdateEnrollment(req.body)
			const enrollment= await this.enrollmentService.updateEnrollmentStatus(id, data as Enrollment)

			res.status(200).json({
				success: true,
				message: "Enrollment updated successfully",
				data: toEnrollmentResponse(enrollment)
			})
		}catch(err){
			next(err)
		}
	}


	deleteEnrollMent: RequestHandler= async(req, res, next)=>{
		try{
			const id= Number(req.params.id)

			if(!Number.isInteger(id) || id<=0){
				throw new AppError("Invalid enrollment id", 400)
			}

			await this.enrollmentService.deleteEnrollment(id)

			res.status(200).json({
				success: true,
				message: "Enrollment deleted successfully"
			})
		}catch(err){
			next(err)
		}
	}





	
}