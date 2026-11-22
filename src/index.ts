import { StudentRepository } from "./modules/students/repositories/StudentRepository.js";
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

const student = new Student(
    1,
    "abdul@example.com",
    "STU001",
    "Abdul",
    "Fathah"
);

const studentRepository= new StudentRepository()


const createdStudent = await studentRepository.create(student);
console.log("Created:", createdStudent.getProfile());

const allStudents = await studentRepository.findAll();
console.log("All students:", allStudents.length);
console.log(allStudents)

const foundStudent = await studentRepository.findById(1);
console.log("Found:", foundStudent?.getProfile());

const updatedStudent = await studentRepository.update(1, {
    firstName: "Ahmed"
});
console.log("Updated:", updatedStudent?.getProfile());

const deleted = await studentRepository.delete(1);
console.log("Deleted:", deleted);

const remainingStudents = await studentRepository.findAll();
console.log("Remaining students:", remainingStudents.length);

