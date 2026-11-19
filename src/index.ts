import { Student } from "./modules/students/Student.js";
import { Teacher } from "./modules/teachers/Teacher.js";
import { User } from "./modules/users/User.js";


const users: User[]=[
	new Student(1, "abdul@gmail.com", "ADM001", "Abdul", "Fathah"),
	new Teacher(2, "sar@gmail.com", "EM001", "Sara", "Joseph", "Computer Science")
]

users.forEach((user)=> {
	console.log(user.getProfile())
})