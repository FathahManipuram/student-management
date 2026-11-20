import { AppError } from "../../../shared/errors/AppError.js";
import { ITeacherRepository } from "../interfaces/ITeacherRepository.js";
import { Teacher } from "../Teacher.js";

type CreateTeacherInput= Pick<Teacher,
	"email" | "employeeNumber" | "firstName" | "lastName" | "department">


type UpdateTeacherInput= Partial< Pick <Teacher, "email" | "firstName" | "lastName" | "department">>



export class TeacherService{
	constructor(private readonly teacherRepository: ITeacherRepository){}

	async getAllTeachers(): Promise<Teacher[]>{
		return this.teacherRepository.findAll()
	}

	async getTeacherById(id: number): Promise<Teacher >{
		const teacher= await this.teacherRepository.findById(id)
		if (!teacher) throw new AppError("Teacher not found", 404);
        return teacher;
	}

	async createTeacher(data: CreateTeacherInput): Promise<Teacher>{

		const teachers= await this.teacherRepository.findAll()


		if (teachers.some(t => t.email === data.email.trim().toLowerCase())) {
            throw new AppError("Email already registered", 409);
        }

        if (teachers.some(
            t => t.employeeNumber.toLowerCase() === data.employeeNumber.trim().toLowerCase()
        )) {
            throw new AppError("Employee number already exists", 409);
        }

        const nextId = teachers.reduce(
            (max, teacher) => Math.max(max, teacher.id), 0
        ) + 1;

        const teacher = new Teacher(
            nextId,
            data.email,
            data.employeeNumber,
            data.firstName,
            data.lastName,
            data.department
        );

        return this.teacherRepository.create(teacher);
	}


	async updateTeacher(id: number, data: UpdateTeacherInput): Promise<Teacher>{
		const existing= await this.getTeacherById(id)

		if (data.email !== undefined) {
            const email = data.email.trim().toLowerCase();
            const teachers = await this.teacherRepository.findAll();

            if (teachers.some(t => t.id !== id && t.email === email)) {
                throw new AppError("Email already registered", 409);
            }
        }

        const updated = await this.teacherRepository.update(existing.id, data);
        if (!updated) throw new AppError("Teacher not found", 404);

        return updated;
	}


	async deleteTeacher(id: number): Promise<void>{
		 await this.getTeacherById(id);
        await this.teacherRepository.delete(id);
	}
}