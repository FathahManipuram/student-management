import { AppError } from "../../../shared/errors/AppError.js";
import { Course } from "../Course.js";
import { ICourseRepository } from "../interfaces/ICourseRepository.js";



type CreateCourseInput = Pick<
    Course,
    "courseCode" | "courseName" | "credits" | "description"
>;

type UpdateCourseInput = Partial<
    Pick<Course, "courseName" | "credits" | "description">
>;

export class CourseService{
	 constructor(private readonly courseRepository: ICourseRepository) {}

    async getAllCourses(): Promise<Course[]> {
        return this.courseRepository.findAll();
    }


  async getCourseById(id: number): Promise<Course> {
        const course = await this.courseRepository.findById(id);
        if (!course) throw new AppError("Course not found", 404);
        return course;
    }



    async createCourse(data: CreateCourseInput): Promise<Course> {
        const courses = await this.courseRepository.findAll();
        const code = data.courseCode.trim().toUpperCase();

        if (courses.some(course => course.courseCode === code)) {
            throw new AppError("Course code already exists", 409);
        }

        const nextId = courses.reduce(
            (max, course) => Math.max(max, course.id), 0
        ) + 1;

        const course = new Course(
            nextId,
            code,
            data.courseName,
            data.credits,
            data.description
        );

        return this.courseRepository.create(course);
    }


    async updateCourse(id: number, data: UpdateCourseInput): Promise<Course> {
        const existing = await this.getCourseById(id);
        const updated = await this.courseRepository.update(existing.id, data);

        if (!updated) throw new AppError("Course not found", 404);
        return updated;
    }

    async deleteCourse(id: number): Promise<void> {
        await this.getCourseById(id);
        await this.courseRepository.delete(id);
    }


}