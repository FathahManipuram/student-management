import { User } from "../User.js";

export interface IUserRepository <T extends User>{
	findAll(): Promise<T[]>

	findById(id: number):Promise<T | null>
}