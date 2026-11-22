# Student Management System

A modular RESTful API built with **TypeScript, Node.js, Express.js, and MySQL** to manage students, teachers, courses, enrollments, and grades.

The project follows Object-Oriented Programming (OOP), the Repository Pattern, Service Layer Architecture, and Dependency Injection to maintain clean, modular, and maintainable code.

## Features

### 1. Student Management
- Create a new student.
- Retrieve all students.
- Retrieve a student by ID.
- Update student information.
- Delete a student.
- Prevent duplicate email addresses and admission numbers.

### 2. Teacher Management
- Create a new teacher.
- Retrieve all teachers.
- Retrieve a teacher by ID.
- Update teacher information.
- Delete a teacher.
- Prevent duplicate email addresses and employee numbers.

### 3. Course Management
- Create a new course.
- Retrieve all courses.
- Retrieve a course by ID.
- Update course information.
- Delete a course.
- Prevent duplicate course codes.
- Validate course credits.

### 4. Enrollment Management
- Enroll students in courses.
- Retrieve all enrollments.
- Retrieve enrollments by ID.
- Update enrollment status.
- Delete enrollments.
- Validate student and course existence.
- Prevent duplicate active enrollments.

### 5. Grade Management
- Create grades for student enrollments.
- Retrieve grades by enrollment.
- Update grade scores.
- Delete grades.
- Validate enrollment existence.
- Automatically calculate grade percentages.

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe application development |
| Node.js | JavaScript runtime |
| Express.js | REST API development |
| MySQL | Relational database |
| mysql2 | MySQL database connectivity |
| Git & GitHub | Version control |

## Architecture

The project follows a modular layered architecture.

```text
src/
├── config/
│   ├── database.ts
│   └── env.ts
│
├── modules/
│   ├── users/
│   │   └── User.ts
│   │
│   ├── students/
│   │   ├── Student.ts
│   │   ├── interfaces/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── controllers/
│   │   └── routes/
│   │
│   ├── teachers/
│   ├── courses/
│   ├── enrollments/
│   └── grades/
│
├── shared/
│   ├── errors/
│   └── utils/
│
├── container.ts
├── app.ts
└── server.ts
```

### Architecture Layers

**Models**
- Represent application entities.
- Use classes, encapsulation, inheritance, and validation.

**Interfaces**
- Define repository contracts.
- Maintain abstraction between business logic and database operations.

**Repositories**
- Handle database operations.
- Implement CRUD functionality using `mysql2/promise`.

**Services**
- Contain business logic.
- Perform validation and existence checks.
- Coordinate repository operations.

**Controllers**
- Handle HTTP requests and responses.
- Connect routes with application services.

**Routes**
- Define REST API endpoints for each module.

**Dependency Injection**
- Centralizes repository and service initialization.
- Provides dependencies to the required modules.

## Database Design

The application uses MySQL with five main tables.

| Table | Description |
|---|---|
| `students` | Stores student information |
| `teachers` | Stores teacher information |
| `courses` | Stores course information |
| `enrollments` | Connects students with courses |
| `grades` | Stores assessment results for enrollments |

### Relationships

- A student can have multiple enrollments.
- A course can have multiple enrollments.
- Each enrollment belongs to one student and one course.
- An enrollment can have multiple grades.
- Grades reference enrollments through a foreign key.

## Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL Server
- Git

### 1. Clone the repository

```bash
git clone https://github.com/FathahManipuram/student-management.git
cd student-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the MySQL database

```sql
CREATE DATABASE student_management;
```

Create the five tables:

- students
- teachers
- courses
- enrollments
- grades

Refer to the SQL table definitions in the project/database setup if available.

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mysql://username:password@localhost:3306/student_management
```

Replace `username` and `password` with your local MySQL credentials.

**Important:** Never commit your `.env` file or expose database credentials.

### 5. Run the application

Development mode:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

Type-check the project:

```bash
npm run typecheck
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api
```

### Students

| Method | Endpoint | Description |
|---|---|---|
| POST | `/students` | Create student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| PATCH | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

### Teachers

| Method | Endpoint | Description |
|---|---|---|
| POST | `/teachers` | Create teacher |
| GET | `/teachers` | Get all teachers |
| GET | `/teachers/:id` | Get teacher by ID |
| PATCH | `/teachers/:id` | Update teacher |
| DELETE | `/teachers/:id` | Delete teacher |

### Courses

| Method | Endpoint | Description |
|---|---|---|
| POST | `/courses` | Create course |
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| PATCH | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Delete course |

### Enrollments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/enrollments` | Create enrollment |
| GET | `/enrollments` | Get all enrollments |
| PATCH | `/enrollments/:id` | Update enrollment |
| DELETE | `/enrollments/:id` | Delete enrollment |

### Grades

| Method | Endpoint | Description |
|---|---|---|
| POST | `/grades` | Create grade |
| GET | `/grades/enrollment/:enrollmentId` | Get grades by enrollment |
| PATCH | `/grades/:id` | Update grade |
| DELETE | `/grades/:id` | Delete grade |

## OOP and TypeScript Concepts

This project demonstrates:

- Classes and objects.
- Inheritance using an abstract User class.
- Encapsulation using private properties and getters/setters.
- Interfaces and abstraction.
- Generic repository interfaces.
- Type-safe function parameters and return values.
- Utility types such as `Partial<T>`.
- Asynchronous programming using `async/await`.
- Promise-based database operations.
- Dependency Injection.
- Repository Pattern.
- Service Layer Architecture.
- SOLID principles.

## Testing

API endpoints were tested using **Postman**.

The following operations were verified:

- Student CRUD operations.
- Teacher CRUD operations.
- Course CRUD operations.
- Enrollment creation, retrieval, status updates, and deletion.
- Grade creation, retrieval, score updates, and deletion.
- MySQL database integration and generated IDs.

## Version Control

Git is used to manage project development.

The project uses feature-based development and commits meaningful implementation milestones.

## Learning Objectives

The main objective of this project is to gain practical experience in:

1. Developing modular backend applications with TypeScript.
2. Applying OOP principles in real-world projects.
3. Implementing the Repository Pattern.
4. Separating business logic from database operations.
5. Working with MySQL using `mysql2`.
6. Building RESTful APIs with Express.js.
7. Implementing dependency injection.
8. Managing relational database relationships.
9. Using Git and GitHub for version control.

## Author

**Abdul Fathah**

Student Management System – TypeScript Backend Project.
