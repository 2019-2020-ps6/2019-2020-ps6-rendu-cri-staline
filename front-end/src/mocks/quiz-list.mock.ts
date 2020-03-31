import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

// export const QUESTION_ACTOR: Question = {
//     label: 'Jean Gabin a joué dans...',
//     answers: [
//         {
//             value: 'Les tuches II',
//             isCorrect: false,
//         },
//         {
//             value: 'La grande illusion',
//             isCorrect: true,
//         }
//     ]
// };

export const QUIZ_LIST: Quiz[] = [
    {
        id: '0',
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [],
    },
    {
        id: '0',
        name: 'Les Sports',
        theme: 'Sport',
        questions: [],
    }
];
