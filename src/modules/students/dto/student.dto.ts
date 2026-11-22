import { Student } from "../Student.js";

export type CreateStudentInput= Pick<Student, "email"| "admissionNumber" | "firstName" | "lastName" >

export type UpdateStudentInput= Partial< 
Pick<Student, "email" | "firstName" | "lastName" >
>

