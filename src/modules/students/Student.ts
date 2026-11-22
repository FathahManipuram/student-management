import { AppError } from "../../shared/errors/AppError.js"
import { User} from "../users/User.js"

export class Student extends User{

	constructor(
		id:number,
		email: string,
	private _admissionNumber:string,
	private _firstName: string,
	private _lastName: string,
	){
		super(id, email)

		this.firstName= _firstName
		this.lastName= _lastName
	}

	get admissionNumber(): string{
		return this._admissionNumber
	}

	get firstName(): string{
		return this._firstName
	}

	get lastName(): string{
		return this._lastName
	}

	set firstName(value: string){
		if(!value.trim()){
			throw new AppError("First name cannot be empty", 400)
		}

		this._firstName= value.trim()
	}

	set lastName(value: string){
		if(!value.trim()){
			throw new AppError("Last name cannot be empty")
		}

		this._lastName= value.trim()
	}


	override getRole(): "STUDENT" {
		return "STUDENT"
	}

	override getProfile(): string {
		return `Student: ${this.firstName} ${this.lastName} (${this.admissionNumber})`
	}

}


