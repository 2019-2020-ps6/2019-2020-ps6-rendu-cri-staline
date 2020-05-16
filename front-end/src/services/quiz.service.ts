import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
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
  public answerSelected$: Subject<Answer> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();
  public answersSelected$: Subject<Answer[]> = new Subject();

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

  setQuizzesByTheme(themeId: string) {
    const urlWithId = this.quizUrl + '/theme/' + themeId ;
    this.http.get<Quiz[]>(urlWithId).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }
  setSelectedAnswer(quizId: string, questionId: string, answerId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }

  updateQuiz(quizId: string, quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.put<Quiz>(urlWithId, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedAnswers(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers';
    this.http.get<Answer[]>(urlWithId).subscribe((answers) => {
      this.answersSelected$.next(answers);
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

  updateQuestion(quizId: string, questionId: string, question: Question) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId;
    this.http.put<Question>(urlWithId, question, this.httpOptions).subscribe(() => this.setQuestionsFromUrl(quizId));
  }

  addAnswer(quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers';
    this.http.post<Answer>(urlWithId, answer, this.httpOptions).subscribe(() => this.setAnswersFromUrl(quizId, questionId));
  }

  deleteAnswer(quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers' + '/' + answer.id;
    this.http.delete<Answer>(urlWithId, this.httpOptions).subscribe(() => this.setAnswersFromUrl(quizId, questionId));
  }

  updateAnswer(quizId: string, questionId: string, answerId: string, answer: Answer) {
    const urlWithId = this.quizUrl + '/' + quizId + '/questions' + '/' + questionId + '/answers' + '/' + answerId;
    this.http.put<Answer>(urlWithId, answer, this.httpOptions).subscribe(() => this.setAnswersFromUrl(quizId, questionId));
  }

}

