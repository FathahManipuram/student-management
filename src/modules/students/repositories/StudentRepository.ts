import {IStudentRepository} from '../interfaces/IStudentRepository.js'
import { Student } from '../Student.js';

export class StudentRepository implements IStudentRepository{
    private students: Student[]=[];


	async findAll(): Promise<Student[]>{
		return [...this.students]
	}


	async findById(id: number): Promise<Student | null> {
		const student= this.students.find((student )=> student.id===id)

		return student ?? null
	}


	async create(student: Student): Promise<Student>{
		this.students.push(student)

		return student
	}


	async update(id: number, data: Partial<Student>):Promise<Student | null>{
		const student= await this.findById(id)

		if(!student){
			return null
		}

		if(data.email !==undefined){
			student.email= data.email
		}

		if(data.firstName !==undefined){
			student.firstName= data.firstName
		}

		if(data.lastName!==undefined){
			student.lastName= data.lastName
		}

		return student
	}
	

	async delete(id: number): Promise<boolean>{
		const studentIndex= this.students.findIndex((student)=> student.id===id)

		if(studentIndex===-1){
			return false
		}

		this.students.splice(studentIndex, 1);
		return true
	}

}