import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Grade } from "../Grade.js";
import { IGradeRepository } from "../interfaces/IGradeRepository.js";
import { pool } from "../../../config/database1.js";


interface GradeRow extends RowDataPacket {
    id: number;
    enrollmentId: number;
    assessmentName: string;
    score: number | string;
    maxScore: number | string;
}



export class GradeRepository implements IGradeRepository{
	async findAll(): Promise<Grade[]> {
		 const [rows] = await pool.execute<GradeRow[]>(
            `SELECT
                id,
                enrollment_id AS enrollmentId,
                assessment_name AS assessmentName,
                score,
                max_score AS maxScore
            FROM grades`
        );

        return rows.map(
            (row) =>
                new Grade(
                    row.id,
                    row.enrollmentId,
                    row.assessmentName,
                    Number(row.score),
                    Number(row.maxScore)
                )
        );
	}

	async findById(id: number): Promise<Grade | null> {
		const [rows] = await pool.execute<GradeRow[]>(
            `SELECT
                id,
                enrollment_id AS enrollmentId,
                assessment_name AS assessmentName,
                score,
                max_score AS maxScore
            FROM grades
            WHERE id = ?`,
            [id]
        );

        const row = rows[0];

        if (!row) return null;

        return new Grade(
            row.id,
            row.enrollmentId,
            row.assessmentName,
            Number(row.score),
            Number(row.maxScore)
        );
	}


	async findByEnrollmentId(enrollmentId: number): Promise<Grade[]> {
		const [rows] = await pool.execute<GradeRow[]>(
            `SELECT
                id,
                enrollment_id AS enrollmentId,
                assessment_name AS assessmentName,
                score,
                max_score AS maxScore
            FROM grades
            WHERE enrollment_id = ?`,
            [enrollmentId]
        );

        return rows.map(
            (row) =>
                new Grade(
                    row.id,
                    row.enrollmentId,
                    row.assessmentName,
                    Number(row.score),
                    Number(row.maxScore)
                )
        );
	}


	async create(grade: Grade): Promise<Grade> {
		const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO grades (
                enrollment_id,
                assessment_name,
                score,
                max_score
            )
            VALUES (?, ?, ?, ?)`,
            [
                grade.enrollmentId,
                grade.assessmentName,
                grade.score,
                grade.maxScore
            ]
        );

        return new Grade(
            result.insertId,
            grade.enrollmentId,
            grade.assessmentName,
            grade.score,
            grade.maxScore
        );
	}



	async update(id: number, data: Partial<Grade>): Promise<Grade | null> {
		const grade = await this.findById(id);

        if (!grade) return null;

        if (data.score !== undefined) {
            await pool.execute<ResultSetHeader>(
                `UPDATE grades
                SET score = ?
                WHERE id = ?`,
                [data.score, id]
            );

            grade.score = data.score;
        }

        return grade;
	}

	
	async delete(id: number): Promise<boolean> {
		const [result] = await pool.execute<ResultSetHeader>(
            `DELETE FROM grades WHERE id = ?`,
            [id]
        );

        return result.affectedRows > 0;
	}

}












// export class GradeRepository implements IGradeRepository{
// 	private grades: Grade[]=[]

// 	async findAll(): Promise<Grade[]> {
// 		return [...this.grades]
// 	}

// 	async findById(id: number): Promise<Grade | null> {
// 		return this.grades.find((grade)=> grade.id === id) ?? null
// 	}

// 	async findByEnrollmentId(enrollmentId: number): Promise<Grade[]> {
// 		return this.grades.filter(grade=> grade.enrollmentId===enrollmentId)
// 	}

// 	async create(grade: Grade): Promise<Grade> {
// 		this.grades.push(grade)

// 		return grade
// 	}

// 	async update(id: number, data: Partial<Grade>): Promise<Grade | null> {
// 		const grade= await this.findById(id)

// 		if(!grade) return null

// 		if(data.score !== undefined){
// 			grade.score= data.score
// 		}

// 		return grade
// 	}

// 	async delete(id: number): Promise<boolean> {
// 		const index= this.grades.findIndex(item => item.id===id)

// 		if(index===-1) return false

// 		this.grades.splice(index, 1)

// 		return true
// 	}
// }