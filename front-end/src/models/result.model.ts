import { Quiz } from './quiz.model';

export interface Result {
    id?: number;
    userId: number;
    quiz?: Quiz;
    answersId: number[];
    score: number;
    date: string;
    startingTime: string;
    endTime: string;
}
