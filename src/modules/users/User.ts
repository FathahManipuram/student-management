export type UserRole= "ADMIN" | "STUDENT" | "TEACHER"

export abstract class User{
	private _email: string

	constructor(
		public readonly id: number,
		email: string
	){
		this._email= this.validateEmail(email)
	}

	get email(): string{
		return this._email
	}

	set email(value: string){
		this._email= this.validateEmail(value)
	}

	private validateEmail(value: string): string{
		const normalizedEmail= value.trim().toLowerCase()

		if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)){
			throw new Error("Invalid email address")
		}
		return normalizedEmail
	}


	abstract getRole():UserRole;

	abstract getProfile():string
}