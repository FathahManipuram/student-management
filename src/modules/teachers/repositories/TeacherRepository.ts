import { ITeacherRepository } from "../interfaces/ITeacherRepository.js";
import { Teacher } from "../Teacher.js";

export class TeacherRepository implements ITeacherRepository{
	private teachers: Teacher[]=[]

	async findAll(): Promise<Teacher[]> {
		return [...this.teachers]
	}

	async findById(id: number): Promise<Teacher | null> {
		return this.teachers.find(teacher=> teacher.id===id) ?? null
	}

	async create(teacher: Teacher): Promise<Teacher> {
		this.teachers.push(teacher)
		return teacher
	}

	async update(id: number, data: Partial<Teacher>): Promise<Teacher | null> {
		const teacher= await this.findById(id)

		if(!teacher) return null

		if(data.email !==undefined) teacher.email= data.email
		if(data.firstName!==undefined) teacher.firstName= data.firstName
		if(data.lastName!==undefined) teacher.lastName= data.lastName
		if(data.department!==undefined) teacher.department= data.department

		return teacher
	}

	async delete(id: number): Promise<boolean> {
		const index= this.teachers.findIndex((teacher)=> teacher.id===id)

		if(index===-1) return false

		this.teachers.splice(index, 1);

		return true
	}


}