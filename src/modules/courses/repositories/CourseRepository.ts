import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Course } from "../Course.js";
import { ICourseRepository } from "../interfaces/ICourseRepository.js";
import { pool } from "../../../config/database1.js";




interface CourseRow extends RowDataPacket {
    id: number;
    courseCode: string;
    courseName: string;
    credits: number;
    description: string;
}


export class CourseRepository implements ICourseRepository{
	async findAll(): Promise<Course[]> {
		const [rows] = await pool.execute<CourseRow[]>(`
            SELECT
                id,
                course_code AS courseCode,
                course_name AS courseName,
                credits,
                description
            FROM courses
        `);

        return rows.map(row => new Course(
            row.id,
            row.courseCode,
            row.courseName,
            row.credits,
            row.description
        ));
	}


	async findById(id: number): Promise<Course | null> {
		 const [rows] = await pool.execute<CourseRow[]>(
            `SELECT
                id,
                course_code AS courseCode,
                course_name AS courseName,
                credits,
                description
             FROM courses
             WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) return null;

        const row = rows[0]!;

        return new Course(
            row.id,
            row.courseCode,
            row.courseName,
            row.credits,
            row.description
        );
	}


	async create(course: Course): Promise<Course> {
		 const [result] = await pool.execute<ResultSetHeader>(
            `INSERT INTO courses
                (course_code, course_name, credits, description)
             VALUES (?, ?, ?, ?)`,
            [
                course.courseCode,
                course.courseName,
                course.credits,
                course.description
            ]
        );

        return new Course(
            result.insertId,
            course.courseCode,
            course.courseName,
            course.credits,
            course.description
        );
	}

	async update(id: number, data: Partial<Course>): Promise<Course | null> {
		 const course = await this.findById(id);

        if (!course) return null;

        if (data.courseName !== undefined) {
            course.courseName = data.courseName;
        }

        if (data.credits !== undefined) {
            course.credits = data.credits;
        }

        if (data.description !== undefined) {
            course.description = data.description;
        }

        await pool.execute<ResultSetHeader>(
            `UPDATE courses
             SET course_name = ?, credits = ?, description = ?
             WHERE id = ?`,
            [
                course.courseName,
                course.credits,
                course.description,
                id
            ]
        );

        return course;
	}

	async delete(id: number): Promise<boolean> {
		const [result] = await pool.execute<ResultSetHeader>(
            `DELETE FROM courses WHERE id = ?`,
            [id]
        );

        return result.affectedRows > 0;
	}
}



// export class CourseRepository implements ICourseRepository {
// 	private courses: Course[]= [];

// 	async findAll(): Promise<Course[]> {
// 		return [...this.courses]
// 	}

// 	async findById(id: number): Promise<Course | null> {
// 		return this.courses.find(course=> course.id===id) ?? null
// 	}

// 	async create(course: Course): Promise<Course> {
// 		this.courses.push(course);
// 		return course
// 	}

// 	async update(id: number, data: Partial<Course>): Promise<Course | null> {
// 		const course= await this.findById(id)

// 		if(!course) return null

// 		 if (data.courseName !== undefined) {
//             course.courseName = data.courseName;
//         }

// 		 if (data.credits !== undefined) {
//             course.credits = data.credits;
//         }

//         if (data.description !== undefined) {
//             course.description = data.description;
//         }

// 		return course
// 	}


// 	async delete(id: number): Promise<boolean> {
// 		const index= this.courses.findIndex((course)=> course.id===id)

// 		if(index=== -1) return false


// 		this.courses.splice(index, 1)

// 		return true
// 	}



// }