import { AppError } from "../../../shared/errors/AppError.js";
import { CreateStudentInput, UpdateStudentInput } from "../dto/student.dto.js";
import { IStudentRepository } from "../interfaces/IStudentRepository.js";
import { Student } from "../Student.js";

export class StudentService{
	constructor(
		private readonly studentRepository: IStudentRepository
	){}

	async getAllStudents(): Promise<Student[]>{
		return this.studentRepository.findAll()
	}

	async getStudentById(id: number): Promise<Student> {
		const student= await this.studentRepository.findById(id)

		if(!student){
			throw new AppError("Student not found", 404)
		}

		return student
	}


	async createStudent(data: CreateStudentInput): Promise<Student>{
		const student= await this.studentRepository.findAll()

		const email= data.email.trim().toLowerCase()
		const admissionNumber= data.admissionNumber.trim()

		if(!data.firstName.trim() || !data.lastName.trim()){
			throw new AppError("Student name is required", 400)
		}

		if(!data.admissionNumber){
			throw new AppError("Admission number is required", 400)
		}

		const duplicateEmail= student.some((student)=> student.email===email)

		if(duplicateEmail){
			throw new AppError("Email already registered", 409)
		}

		const duplicateAdmissionNumber= student.some((student)=> student.admissionNumber===admissionNumber)

		if(duplicateAdmissionNumber){
			throw new AppError("Admission number already exists", 409)
		}

		const nextId= student.reduce((maximumId, student)=> Math.max(maximumId, student.id) ,0)+1

		const newStudent= new Student(
			nextId,
			email,
			admissionNumber,
			data.firstName,
			data.lastName
		)

		return this.studentRepository.create(newStudent)
	}


	async updateStudent(
		id: number,
		data: UpdateStudentInput
	): Promise<Student>{
		const existingStudent= await this.getStudentById(id)

		const students= await this.studentRepository.findAll()

		if(data.email !== undefined){
			const email= data.email.trim().toLowerCase()
			const duplicateEmail= students.some((student)=> student.id!==id && student.email===email)

			if(duplicateEmail){
				throw new AppError("email already registered", 409)
			}

		}

		const updatedStudent= await this.studentRepository.update(existingStudent.id, data)

		if(!updatedStudent) {
			throw new AppError("Student not found", 404)
		}
		return updatedStudent
	}

	async deleteStudent(id: number): Promise<void>{
		await this.getStudentById(id)
		await this.studentRepository.delete(id)
	}
}