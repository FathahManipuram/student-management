import { Course } from "../Course.js";
import { ICourseRepository } from "../interfaces/ICourseRepository.js";

export class CourseRepository implements ICourseRepository {
	private courses: Course[]= [];

	async findAll(): Promise<Course[]> {
		return [...this.courses]
	}

	async findById(id: number): Promise<Course | null> {
		return this.courses.find(course=> course.id===id) ?? null
	}

	async create(course: Course): Promise<Course> {
		this.courses.push(course);
		return course
	}

	async update(id: number, data: Partial<Course>): Promise<Course | null> {
		const course= await this.findById(id)

		if(!course) return null

		 if (data.courseName !== undefined) {
            course.courseName = data.courseName;
        }

		 if (data.credits !== undefined) {
            course.credits = data.credits;
        }

        if (data.description !== undefined) {
            course.description = data.description;
        }

		return course
	}


	async delete(id: number): Promise<boolean> {
		const index= this.courses.findIndex((course)=> course.id===id)

		if(index=== -1) return false


		this.courses.splice(index, 1)

		return true
	}



}