import { AppError } from "../../shared/errors/AppError.js"

export class Course{
	

	constructor(
		public readonly id: number,
		private _courseCode: string,
		private _courseName: string,
		private _credits: number,
		private _description: string

	){
		this.courseCode= _courseCode
		this.courseName= _courseName
		this.credits= _credits
		this.description= _description
	}


	get courseCode(): string{
		return this._courseCode
	}

	set courseCode(value: string){
		this._courseCode= this.validateCourseCode(value)
	}

	get courseName(): string{
		return this._courseName
	}

	set courseName(value: string){
		this._courseName= this.validateCourseName(value)
	}

	get credits(): number{
		return this._credits
	}

	set credits(value: number){
		this._credits= this.validateCredits(value)
	}

	get description():string{
		return this._description
	}

	set description(value: string){
		this._description= value.trim()
	}



	private validateCourseCode(value: string):string{
		const code= value.trim().toUpperCase()

		if(!code){
			throw new AppError("Course code is required", 400)
		}
		return code
	}


	private validateCourseName(value: string): string{
		const name= value.trim()

		if(!name){
			throw new AppError("Course name is required", 400)
		}
		return name
	}

	private validateCredits(value: number): number{
		if(!Number.isInteger(value) || value < 1 || value > 10){
			throw new AppError("Credits must be an integer between 1 and 10", 400)
		}
		return value
	}


	getCourseDetails(): string{
		return `${this.courseCode}: ${this.courseName} ${this.credits}`
	}

}