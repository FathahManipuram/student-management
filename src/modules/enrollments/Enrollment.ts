export type EnrollmentStatus=
| "PENDING"
| "ACTIVE"
| "COMPLETED"
|"CANCELLED"

export class Enrollment{
	constructor(
		public readonly id: number,
		public readonly studentId: number,
		public readonly courseId: number,
		private _status: EnrollmentStatus= "PENDING"
	){}

	get status():EnrollmentStatus{
		return this._status
	}

	activate (): void{
		this._status= "ACTIVE"
	}

	complete(): void{
		this._status = "COMPLETED"
	}

	cancell(): void{
		this._status= "CANCELLED"
	}

}