import { AppError } from "../../shared/errors/AppError.js";
import { User} from "../users/User.js";

export class Teacher extends User{
	constructor(
		id: number,
		email: string,
		private _employeeNumber: string,
		private _firstName: string,
		private _lastName: string,
		private _department: string
		
	){
		super(id, email)
	}

	get employeeNumber(): string{
		return this._employeeNumber
	}

	get firstName(): string{
		return this._firstName
	}

	set firstName(value: string){
		if(!value.trim()){
			throw new AppError("Name cannot empty", 400)
		}

		this._firstName= value
	}

	get lastName(): string{
		return this._lastName.trim()
	}

	set lastName(value: string){
		if(!value.trim()){
			throw new AppError("Last name cannot be empty", 400)
		}

		this._lastName= value.trim()
	}

	get department():string{
		return this._department
	}

	set department(value: string){
		if(!value.trim()){
			throw new AppError("Department cannot be empty")
		}

		this._department= value.trim()
	}

	override getRole(): "TEACHER" {
		return "TEACHER"
	}

	override getProfile(): string {
		return `Teacher: ${this.firstName} ${this.lastName} - ${this.department}`
	}
}

