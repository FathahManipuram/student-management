import { IUserRepository } from "../../users/interfaces/IUserRepository.js";
import { Teacher } from "../Teacher.js";

export interface ITeacherRepository extends IUserRepository<Teacher>{
	create(teacher: Teacher): Promise<Teacher>;

	update(
		id: number,
		data: Partial<Teacher>
	): Promise<Teacher | null>;

	delete(id: number): Promise<boolean>;
}