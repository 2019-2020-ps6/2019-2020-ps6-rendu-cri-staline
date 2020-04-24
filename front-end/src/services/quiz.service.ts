import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[];
  private questions: Question[];
  private answers: Answer[];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject(this.answers);

  public quizSelected$: Subject<Quiz> = new Subject();
  public questionsSelected$: Subject<Question> = new Subject();
  public answersSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  setQuestionsFromUrl(quizId: string) {
    this.http.get<Question[]>(this.quizUrl + '/' + quizId + '/questions').subscribe((questionsList) => {
      this.questions = questionsList;
      this.questions$.next(this.questions);
    });
  }

  setAnswersFromUrl(quizId: string, questionId: string) {
    this.http.get<Answer[]>(this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers').subscribe(
      (answersList) => {
      this.answers = answersList;
      this.answers$.next(this.answers);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });

  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionsSelected$.next(question);
    });
  }

  addQuestion(quizId: string, question: Question) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions';
    this.http.post<Question>(urlWithId, question, this.httpOptions).subscribe(() => this.setQuestionsFromUrl(quizId));
  }

  deleteQuestion(quizId: string, question: Question) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() => this.setQuestionsFromUrl(quizId));
  }

  /* Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.

  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}

