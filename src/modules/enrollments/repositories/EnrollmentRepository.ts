import { Enrollment } from "../Enrollment.js";
import { IEnrollmentRepository } from "../interfaces/IEnrollmentRepository.js";

export class EnrollmentRepository implements IEnrollmentRepository{
	private enrollments: Enrollment[]=[]

	async findAll(): Promise<Enrollment[]> {
		return [...this.enrollments]
	}

	async findById(id: number): Promise<Enrollment | null> {
		return this.enrollments.find((item)=> item.id===id) ?? null
	}

	async findByStudentId(studentId: number): Promise<Enrollment[]> {
		return this.enrollments.filter(item=> item.studentId=== studentId)
	}

	async create(enrollment: Enrollment): Promise<Enrollment> {
		this.enrollments.push(enrollment)

		return enrollment
	}

	async update(id: number, data: Partial<Enrollment>): Promise<Enrollment | null> {
		const enrollment= await this.findById(id)

		if(!enrollment) return null

		if(data.status!==undefined){
			enrollment.status=data.status
		}

		return enrollment

	}

	async delete(id: number): Promise<boolean> {
		const index= this.enrollments.findIndex(item=> item.id===id)

		if(index===-1) return false

		this.enrollments.splice(index, 1)

		return true
	}
}