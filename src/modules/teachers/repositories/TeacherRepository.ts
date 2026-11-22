import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ITeacherRepository } from "../interfaces/ITeacherRepository.js";
import { Teacher } from "../Teacher.js";
import { pool } from "../../../config/database1.js";

// export class TeacherRepository implements ITeacherRepository{
// 	private teachers: Teacher[]=[]

// 	async findAll(): Promise<Teacher[]> {
// 		return [...this.teachers]
// 	}

// 	async findById(id: number): Promise<Teacher | null> {
// 		return this.teachers.find(teacher=> teacher.id===id) ?? null
// 	}

// 	async create(teacher: Teacher): Promise<Teacher> {
// 		this.teachers.push(teacher)
// 		return teacher
// 	}

// 	async update(id: number, data: Partial<Teacher>): Promise<Teacher | null> {
// 		const teacher= await this.findById(id)

// 		if(!teacher) return null

// 		if(data.email !==undefined) teacher.email= data.email
// 		if(data.firstName!==undefined) teacher.firstName= data.firstName
// 		if(data.lastName!==undefined) teacher.lastName= data.lastName
// 		if(data.department!==undefined) teacher.department= data.department

// 		return teacher
// 	}

// 	async delete(id: number): Promise<boolean> {
// 		const index= this.teachers.findIndex((teacher)=> teacher.id===id)

// 		if(index===-1) return false

// 		this.teachers.splice(index, 1);

// 		return true
// 	}


// }


interface TeacherRow extends RowDataPacket{
id: number,
email: string,
employeeNumber: string,
firstName: string,
lastName: string,
department: string
}

export class TeacherRepository implements ITeacherRepository{
	async findAll(): Promise<Teacher[]> {
		const [rows]= await pool.execute<TeacherRow[]>(`
		SELECT
		 id,
         email,
         employee_number AS employeeNumber,
         first_name AS firstName,
         last_name AS lastName,
         department
		 FROM teachers
		`)

		return rows.map(row=> new Teacher(
			row.id,
            row.email,
            row.employeeNumber,
            row.firstName,
            row.lastName,
            row.department
		))
	}


	async findById(id: number): Promise<Teacher | null> {
		const[rows]= await pool.execute<TeacherRow[]>(`
		 SELECT
         id,
         email,
         employee_number AS employeeNumber,
         first_name AS firstName,
         last_name AS lastName,
         department
             FROM teachers WHERE id= ?
		`, [id])

		if(rows.length===0){
			return null
		}

		const row= rows[0]!
		return new Teacher(
			row.id,
            row.email,
            row.employeeNumber,
            row.firstName,
            row.lastName,
            row.department
		)
	}


	async create(teacher: Teacher): Promise<Teacher> {
		const [result]= await pool.execute<ResultSetHeader>(
			`INSERT INTO teachers (email, employee_number, first_name, last_name, department)
			VALUES(?, ?, ?, ?, ?)`,
			[
				teacher.email,
                teacher.employeeNumber,
                teacher.firstName,
                teacher.lastName,
                teacher.department
			]
		)

		return new Teacher(
			result.insertId,
            teacher.email,
            teacher.employeeNumber,
            teacher.firstName,
            teacher.lastName,
            teacher.department
		)
	}

	

	async update(id: number, data: Partial<Teacher>): Promise<Teacher | null> {
		const teacher= await this.findById(id)

		if(!teacher) return null


		 if (data.email !== undefined) {
            teacher.email = data.email;
        }

        if (data.firstName !== undefined) {
            teacher.firstName = data.firstName;
        }

        if (data.lastName !== undefined) {
            teacher.lastName = data.lastName;
        }

        if (data.department !== undefined) {
            teacher.department = data.department;
        }


		await pool.execute<ResultSetHeader>(
			`UPDATE teachers
			SET email=?, first_name = ?, last_name = ?, department = ?
			WHERE id=?`,
			[
				teacher.email,
                teacher.firstName,
                teacher.lastName,
                teacher.department,
                id
			]
		)

		return teacher
	}

	async delete(id: number): Promise<boolean> {
		const [result]= await pool.execute<ResultSetHeader>(
			`DELETE FROM teachers WHERE id= ?`,
			[id]
		)
		return result.affectedRows >0
	}

	
}