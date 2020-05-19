import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Theme } from 'src/models/theme.model';

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
  private themes: Theme[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */



  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject(this.answers);

  public quizSelected$: Subject<Quiz> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();
  public answersSelected$: Subject<Answer[]> = new Subject();
  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';
  public themeImageUrl = serverUrl + '/getThemeFile';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setThemesFromUrl();
  }

  addTheme(theme: Theme, imageFile: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('themeName', theme.themeName);
    formData.append('themeFile', imageFile);
    const options = {
      params: new HttpParams(),
      reportProgress: true,
    };
    const url = this.themeUrl;
    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);

  }

  updateTheme(themeId: string, theme: Theme, imageFile: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    console.log('imageFile before edit:', imageFile);
    formData.append('themeName', theme.themeName);
    formData.append('themeFile', imageFile);
    const options = {
      params: new HttpParams(),
      reportProgress: true,
    };
    const url = this.themeUrl + '/' + themeId;
    const req = new HttpRequest('PUT', url, formData, options);
    return this.http.request(req);

  }
  setThemesFromUrl() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }


  setSelectedTheme(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });

  }

  deleteTheme(theme: Theme) {
    console.log('calling delete theme:', theme);
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  setQuizzesFromUrl(themeId: string) {
    this.http.get<Quiz[]>(this.themeUrl + '/' + themeId + '/quizzes').subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }


  setQuestionsFromUrl(themeId: string, quizId: string) {
    this.http.get<Question[]>(this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId + '/questions').subscribe((questionsList) => {
      this.questions = questionsList;
      this.questions$.next(this.questions);
    });
  }

  setAnswersFromUrl(themeId: string, quizId: string, questionId: string) {
    this.http.get<Answer[]>(this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers').subscribe((answersList) => {
      this.answers = answersList;
      this.answers$.next(this.answers);
    });
  }

  addQuiz(themeId: string, quiz: Quiz) {
    this.http.post<Quiz>(this.themeUrl  + '/' +
    themeId +  '/quizzes/', quiz, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }

  deleteQuiz(themeId: string, quiz: Quiz) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }

  setSelectedQuiz(themeId: string, quizId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });

  }

  setSelectedQuestion(themeId: string, quizId: string, questionId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
     quizId + '/questions' + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }
  setSelectedAnswer(themeId: string, quizId: string, questionId: string, answerId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
     quizId + '/questions' + '/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }

  updateQuiz(themeId: string, quizId: string, quiz: Quiz) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId;
    this.http.put<Quiz>(urlWithId, quiz, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }

  setSelectedAnswers(themeId: string, quizId: string, questionId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId + '/questions' + '/' + questionId + '/answers';
    this.http.get<Answer[]>(urlWithId).subscribe((answers) => {
      this.answersSelected$.next(answers);
    });
  }

  addQuestion(themeId: string, quizId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions';
    this.http.post<Question>(urlWithId, question, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }

  deleteQuestion(themeId: string, quizId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }

  updateQuestion(themeId: string, quizId: string, questionId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId;
    this.http.put<Question>(urlWithId, question, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }

  addAnswer(themeId: string, quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers';
    this.http.post<Answer>(urlWithId, answer, this.httpOptions).subscribe(() =>
    this.setAnswersFromUrl(themeId, quizId, questionId));
  }

  deleteAnswer(themeId: string, quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers' + '/' + answer.id;
    this.http.delete<Answer>(urlWithId, this.httpOptions).subscribe(() =>
     this.setAnswersFromUrl(themeId, quizId, questionId));
  }

  updateAnswer(themeId: string, quizId: string, questionId: string, answerId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId
    + '/questions' + '/' + questionId + '/answers' + '/' + answerId;
    this.http.put<Answer>(urlWithId, answer, this.httpOptions).subscribe(() =>
    this.setAnswersFromUrl(themeId, quizId, questionId));
  }

}

