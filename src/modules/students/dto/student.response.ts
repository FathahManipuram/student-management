import { Student } from "../Student.js"

export interface StudentResponse{
	id: number
	email: string
	admissionNumber: string
	firstName: string
	lastName: string
}

export const toStudentResponse=(student: Student): StudentResponse=>({
	id: student.id,
	email: student.email,
	admissionNumber: student.admissionNumber,
	firstName: student.firstName,
	lastName: student.lastName
	
})