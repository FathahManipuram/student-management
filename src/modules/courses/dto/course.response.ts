import { Course } from "../Course.js";

export interface CourseResponse {
    id: number;
    courseCode: string;
    courseName: string;
    credits: number;
    description: string;
}

export const toCourseResponse = (course: Course): CourseResponse => ({
    id: course.id,
    courseCode: course.courseCode,
    courseName: course.courseName,
    credits: course.credits,
    description: course.description
});