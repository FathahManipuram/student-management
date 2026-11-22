import { RequestHandler } from "express";
import { CourseService } from "../services/CourseService.js";
import { toCourseResponse } from "../dto/course.response.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class CourseController{
	constructor(private readonly courseService: CourseService){}

	getAllCourse: RequestHandler= async (_req, res,next)=>{
		try{
			const courses= await this.courseService.getAllCourses()

			res.status(200).json({
				success: true,
				message: "Course retrieved successfully",
				data: courses.map((course)=> toCourseResponse(course))
			})
		}catch(err){
			next(err)
		}
	}


	getCourseById: RequestHandler=async(req, res, next)=>{
		try{
			const id= Number(req.params.id)
			 if (!Number.isInteger(id) || id <= 0) {
                throw new AppError("Invalid course ID", 400);
            }
			const course= await this.courseService.getCourseById(id)

			res.status(200).json({
				success: true,
				message: "Course retrieved successsfully",
				data: toCourseResponse(course)
			})
		}catch(err){
			next(err)
		}
	}



	createCourse: RequestHandler=async(req, res, next)=>{
		try{
			const course= await this.courseService.createCourse(req.body)
			res.status(201).json({
				success: true,
				message: "Course created successfully",
				data: toCourseResponse(course)

			})
		}catch(err){
			next(err)
		}

	}

	updateCourse: RequestHandler= async(req, res, next)=>{
		try{
			const id= Number(req.params.id)
			 if (!Number.isInteger(id) || id <= 0) {
                throw new AppError("Invalid course ID", 400);
            }


			const course= await this.courseService.updateCourse(id, req.body)

			res.status(200).json({
				success: true,
				message: "Course updated successfully",
				data: toCourseResponse(course)
			})
		}catch(err){
			next(err)
		}
	}

	deleteCourse: RequestHandler= async(req, res, next)=>{
		try{
			const id= Number(req.params.id)

			 if (!Number.isInteger(id) || id <= 0) {
                throw new AppError("Invalid course ID", 400);
            }

			await this.courseService.deleteCourse(id)

			res.status(200).json({
				success: true,
				message: "Course deleted successfully",
			})
		}catch(err){
			next(err)
		}
	}
}