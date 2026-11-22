import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Enrollment, EnrollmentStatus } from "../Enrollment.js";
import { IEnrollmentRepository } from "../interfaces/IEnrollmentRepository.js";
import { pool } from "../../../config/database1.js";


interface EnrollmentRow extends RowDataPacket {
    id: number;
    studentId: number;
    courseId: number;
    status: EnrollmentStatus;
}

export class EnrollmentRepository implements IEnrollmentRepository{

	async findAll(): Promise<Enrollment[]> {
		 const [rows] = await pool.execute<EnrollmentRow[]>(
            `SELECT
                id,
                student_id AS studentId,
                course_id AS courseId,
                status
            FROM enrollments`
        );

        return rows.map(
            (row) =>
                new Enrollment(
                    row.id,
                    row.studentId,
                    row.courseId,
                    row.status
                )
        );
	}

	async findById(id: number): Promise<Enrollment | null> {
		const [rows] = await pool.execute<EnrollmentRow[]>(
            `SELECT
                id,
                student_id AS studentId,
                course_id AS courseId,
                status
            FROM enrollments
            WHERE id = ?`,
            [id]
        );

        const row = rows[0];

        if (!row) return null;

        return new Enrollment(
            row.id,
            row.studentId,
            row.courseId,
            row.status
        );
	}

	async findByStudentId(studentId: number): Promise<Enrollment[]> {
		 const [rows] = await pool.execute<EnrollmentRow[]>(
            `SELECT
                id,
                student_id AS studentId,
                course_id AS courseId,
                status
            FROM enrollments
            WHERE student_id = ?`,
            [studentId]
        );

        return rows.map(
            (row) =>
                new Enrollment(
                    row.id,
                    row.studentId,
                    row.courseId,
                    row.status
                )
        );
	}


	async create(enrollment: Enrollment): Promise<Enrollment> {
		 const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO enrollments (student_id, course_id, status)
            VALUES (?, ?, ?)`,
            [
                enrollment.studentId,
                enrollment.courseId,
                enrollment.status
            ]
        );

        return new Enrollment(
            result.insertId,
            enrollment.studentId,
            enrollment.courseId,
            enrollment.status
        );
	}


	async update(id: number, data: Partial<Enrollment>): Promise<Enrollment | null> {
		 const enrollment = await this.findById(id);

        if (!enrollment) return null;

        if (data.status !== undefined) {
            await pool.execute<ResultSetHeader>(
                `UPDATE enrollments
                SET status = ?
                WHERE id = ?`,
                [data.status, id]
            );

            enrollment.status = data.status;
        }

        return enrollment;
	}



	async delete(id: number): Promise<boolean> {
		 const [result] = await pool.execute<ResultSetHeader>(
            `DELETE FROM enrollments WHERE id = ?`,
            [id]
        );

        return result.affectedRows > 0;
	}
}








// export class EnrollmentRepository implements IEnrollmentRepository{
// 	private enrollments: Enrollment[]=[]

// 	async findAll(): Promise<Enrollment[]> {
// 		return [...this.enrollments]
// 	}

// 	async findById(id: number): Promise<Enrollment | null> {
// 		return this.enrollments.find((item)=> item.id===id) ?? null
// 	}

// 	async findByStudentId(studentId: number): Promise<Enrollment[]> {
// 		return this.enrollments.filter(item=> item.studentId=== studentId)
// 	}

// 	async create(enrollment: Enrollment): Promise<Enrollment> {
// 		this.enrollments.push(enrollment)

// 		return enrollment
// 	}

// 	async update(id: number, data: Partial<Enrollment>): Promise<Enrollment | null> {
// 		const enrollment= await this.findById(id)

// 		if(!enrollment) return null

// 		if(data.status!==undefined){
// 			enrollment.status=data.status
// 		}

// 		return enrollment

// 	}

// 	async delete(id: number): Promise<boolean> {
// 		const index= this.enrollments.findIndex(item=> item.id===id)

// 		if(index===-1) return false

// 		this.enrollments.splice(index, 1)

// 		return true
// 	}
// }