import { Course } from "../Course.js";

export type CreateCourseInput = Pick<
    Course,
    "courseCode" | "courseName" | "credits" | "description"
>;

export type UpdateCourseInput = Partial<
    Pick<Course, "courseName" | "credits" | "description">
>;