import type { RequestHandler } from "express";
import { Teacher } from "../Teacher.js";
import { TeacherService } from "../services/TeacherServices.js";

function toTeacherResponse(teacher: Teacher) {
    return {
        id: teacher.id,
        email: teacher.email,
        employeeNumber: teacher.employeeNumber,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        department: teacher.department
    };
}


export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    getAllTeachers: RequestHandler = async (_req, res) => {
        const teachers = await this.teacherService.getAllTeachers();

        res.status(200).json({
            success: true,
            message: "Teachers retrieved successfully",
            data: teachers.map(toTeacherResponse)
        });
    };

    getTeacherById: RequestHandler = async (req, res) => {
		const id= req.params.id
        const teacher = await this.teacherService.getTeacherById(
         Number(id)
        );

        res.status(200).json({
            success: true,
            message: "Teacher retrieved successfully",
            data: toTeacherResponse(teacher)
        });
    };

    createTeacher: RequestHandler = async (req, res) => {
        
        const teacher = await this.teacherService.createTeacher(req.body);

        res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            data: toTeacherResponse(teacher)
        });
    };

    updateTeacher: RequestHandler = async (req, res) => {
        const id= req.params.id
        const teacher = await this.teacherService.updateTeacher(
            Number(id),
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Teacher updated successfully",
            data: toTeacherResponse(teacher)
        });
    };

    deleteTeacher: RequestHandler = async (req, res) => {

		const id= Number(req.params.id)
        await this.teacherService.deleteTeacher(id);

        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully"
        });
    };
}