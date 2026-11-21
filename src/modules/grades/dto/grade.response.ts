import { Grade } from "../Grade.js";

export interface GradeResponse{
	id: number,
	enrollmentId: number;
    assessmentName: string;
    score: number;
    maxScore: number;
    percentage: number;
}


export const toGradeResponse=(grade: Grade): GradeResponse => ({
	id: grade.id,
	enrollmentId: grade.enrollmentId,
	assessmentName: grade.assessmentName,
	score: grade.score,
	maxScore: grade.maxScore,
	percentage: Number(grade.getPercentage().toFixed(2))
})
