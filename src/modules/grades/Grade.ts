import { AppError } from "../../shared/errors/AppError.js"

export class Grade {
	
	constructor(
		public readonly id: number,
		public readonly enrollmentId: number,
		public readonly assessmentName: string,
		private _score: number,
		public readonly maxScore: number
	){

		if(!assessmentName.trim()){
			throw new AppError("Assesmant name is required", 400)
		}

		if(!Number.isFinite(maxScore) || maxScore<=0){
			throw new AppError("Maximum score must be greate than zero")
		}
		this.score= _score
	}

	get score():number{
		return this._score
	}

	set score(value: number){
		this._score= this.validateScore(value)
	}

	private validateScore(value: number): number{
		if(!Number.isFinite(value) ||
		value < 0 ||
		value > this.maxScore
		){
			throw new AppError(`Score must be between 0 and ${this.maxScore}`)
		}

		return value
	}

	getPercentage(): number{
		return (this.score/this.maxScore)*100
	}
}