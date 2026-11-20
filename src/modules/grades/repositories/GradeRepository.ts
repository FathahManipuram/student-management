import { Grade } from "../Grade.js";
import { IGradeRepository } from "../interfaces/IGradeRepository.js";

export class GradeRepository implements IGradeRepository{
	private grades: Grade[]=[]

	async findAll(): Promise<Grade[]> {
		return [...this.grades]
	}

	async findById(id: number): Promise<Grade | null> {
		return this.grades.find((grade)=> grade.id === id) ?? null
	}

	async findByEnrollmentId(enrollmentId: number): Promise<Grade[]> {
		return this.grades.filter(grade=> grade.enrollmentId==enrollmentId)
	}

	async create(grade: Grade): Promise<Grade> {
		this.grades.push(grade)

		return grade
	}

	async update(id: number, data: Partial<Grade>): Promise<Grade | null> {
		const grade= await this.findById(id)

		if(!grade) return null

		if(data.score !== undefined){
			grade.score= data.score
		}

		return grade
	}

	async delete(id: number): Promise<boolean> {
		const index= this.grades.findIndex(item => item.id===id)

		if(index===-1) return false

		this.grades.splice(index, 1)

		return true
	}
}