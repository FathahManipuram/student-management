import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {IStudentRepository} from '../interfaces/IStudentRepository.js'
import { Student } from '../Student.js';
import { pool } from '../../../config/database1.js';

// export class StudentRepository implements IStudentRepository{
//     private students: Student[]=[];


// 	async findAll(): Promise<Student[]>{
// 		return [...this.students]
// 	}


// 	async findById(id: number): Promise<Student | null> {
// 		const student= this.students.find((student )=> student.id===id)

// 		return student ?? null
// 	}


// 	async create(student: Student): Promise<Student>{
// 		this.students.push(student)

// 		return student
// 	}


// 	async update(id: number, data: Partial<Student>):Promise<Student | null>{
// 		const student= await this.findById(id)

// 		if(!student){
// 			return null
// 		}

// 		if(data.email !==undefined){
// 			student.email= data.email
// 		}

// 		if(data.firstName !==undefined){
// 			student.firstName= data.firstName
// 		}

// 		if(data.lastName!==undefined){
// 			student.lastName= data.lastName
// 		}

// 		return student
// 	}
	

// 	async delete(id: number): Promise<boolean>{
// 		const studentIndex= this.students.findIndex((student)=> student.id===id)

// 		if(studentIndex===-1){
// 			return false
// 		}

// 		this.students.splice(studentIndex, 1);
// 		return true
// 	}

// }



interface StudentRow extends RowDataPacket{
	id: number,
	email: string,
	admissionNumber: string,
	firstName: string,
	lastName: string
}


export class StudentRepository implements IStudentRepository{
	async findAll(): Promise<Student[]> {
		const [rows]= await pool.execute<StudentRow[]>(`
		
		SELECT
		id, 
		email, 
		admission_number AS admissionNumber,
		first_name AS firstName,
		last_name AS lastName
		FROM students
		`)

		return rows.map(row=> new Student(
			row.id,
            row.email,
            row.admissionNumber,
            row.firstName,
            row.lastName
		))
	}


	async findById(id: number): Promise<Student | null> {
		const [rows]= await pool.execute<StudentRow[]>(
			`
			SELECT
			id, email,
			admission_number AS admissionNumber,
            first_name AS firstName,
            last_name AS lastName
			FROM students WHERE id=?
			`,[id]
		)

		if(rows.length===0){
			return null
		}
		const row= rows[0]!

		return new Student(
			   row.id,
            row.email,
            row.admissionNumber,
            row.firstName,
            row.lastName
		)
	}

	async create(student: Student): Promise<Student> {
		const [result]= await pool.execute<ResultSetHeader>(
			`INSERT INTO students
			(email, admission_number, first_name, last_name)
			VALUES (?, ?, ?, ?)`, [
			    student.email,
                student.admissionNumber,
                student.firstName,
                student.lastName
			]
			
		)

		return new Student(
			 result.insertId,
            student.email,
            student.admissionNumber,
            student.firstName,
            student.lastName
		)
	}

	async update(id: number, data: Partial<Student>): Promise<Student | null> {
		const student= await this.findById(id)

		if(!student){
			return null
		}

		if(data.email !==undefined){
			student.email= data.email
		}

		if (data.firstName !== undefined) {
            student.firstName = data.firstName;
        }

        if (data.lastName !== undefined) {
            student.lastName = data.lastName;
        }


		await pool.execute<ResultSetHeader>(
			`UPDATE students
			SET email= ?, first_name= ?, last_name= ? WHERE id= ?
			`,
			[
				student.email,
				student.firstName,
				student.lastName,
                id
			]
		)

		return student
	}


	async delete(id: number): Promise<boolean> {
		const [result]= await pool.execute<ResultSetHeader>(
			`DELETE FROM students WHERE id=?`, [id]
		)

		return result.affectedRows > 0
	}
}