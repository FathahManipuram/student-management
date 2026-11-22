import { RequestHandler } from "express";
import { StudentService } from "../services/StudentService.js";
import { toStudentResponse } from "../dto/student.response.js";
import { validateCreateStudent } from "../validators/student.validator.js";

export class StudentController{
	constructor(
		private readonly studentService: StudentService
	){}

	getAllStudents: RequestHandler = async (_req, res)=>{
		const students= await this.studentService.getAllStudents();

		res.status(200).json({
			success: true,
			message: "Students retrieved successfully",
			data: students.map((student)=> toStudentResponse(student))
		})
	}


	getStudentById: RequestHandler= async(req, res)=>{

		const id= Number(req.params.id)

		if(!Number.isInteger(id) || id<=0){
			res.status(400).json({
				success: false,
				message:"Invalid student id"
			})
			return
		}


		const student= await this.studentService.getStudentById(id)

		res.status(200).json({
			success: true,
			message: "Student retrieved successfully",
			data: toStudentResponse(student)
		})
	}

	createStudent: RequestHandler= async(req, res)=>{

		const input= validateCreateStudent(req.body)
		const student= await this.studentService.createStudent(input)

		res.status(201).json({
			success: true,
			message: "Student created successfully",
			data: toStudentResponse(student)
		})
	}


	updateStudent: RequestHandler= async(req, res)=>{
		const id= Number(req.params.id)

		if(!Number.isInteger(id) || id<=0){
			res.status(400).json({
				success: false,
				message: "Invalid student id"
			})
			return
		}

		const student= await this.studentService.updateStudent(id, req.body)

		res.status(200).json({
			success: true,
			message: "Student updated successfully",
			data: toStudentResponse(student)
		})

	}

	deleteStudent: RequestHandler= async(req, res)=>{
		const id= Number(req.params.id)

		if(!Number.isInteger(id) || id<=0){
			res.status(400).json({
				success: false,
				message: "Invalid student id"
			})

			return
		}

		await this.studentService.deleteStudent(id)

		res.status(200).json({
			success: true,
			message: "Student deleted successfully"
		})
	}
}