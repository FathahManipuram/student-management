import { Grade } from "../Grade.js";

export type createGradeInput= Pick<Grade, 
"enrollmentId" | "assessmentName" | "score" | "maxScore">


export type updateGradeInput= Pick<Grade, "score">