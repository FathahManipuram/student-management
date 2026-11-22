import { Course } from "../Course.js";

export interface ICourseRepository{
	findAll(): Promise<Course[]>

	findById(id: number): Promise<Course | null>

	create(course: Course): Promise<Course>

	update(
		id: number,
		data: Partial<Course>
	): Promise<Course | null>


	delete(id: number):Promise<boolean>;
}