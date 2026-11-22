import { IUserRepository } from "../../users/interfaces/IUserRepository.js";
import { Student } from "../Student.js";

export interface IStudentRepository extends IUserRepository<Student>{
	create(student: Student): Promise<Student>

	update(id: number, data: Partial<Student>):Promise<Student | null>

	delete(id: number): Promise<boolean>
}