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
   * La liste des quizzs.
   */
  private quizzes: Quiz[];

  /**
   * La liste des questions.
   */
  private questions: Question[];

  /**
   * La liste des réponses.
   */
  private answers: Answer[];

  /**
   * La liste des thèmes.
   */
  private themes: Theme[];

  /**
   * Observable qui contient la liste des themes.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);

  /**
   * Observable qui contient la liste des quizzes.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  /**
   * Observable qui contient la liste des questions.
   */
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  /**
   * Observable qui contient la liste des réponses..
   */
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


  /**
   * Mettre à jour un thème.
   * @param themeId Identifient du theme.
   * @param theme Theme.
   * @param imageFile Image.
   */
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

  /**
   * Récupérer les themes.
   */
  setThemesFromUrl() {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }


  /**
   * Récupérer un theme.
   * @param themeId Identifiant du theme.
   */
  setSelectedTheme(themeId: string) {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });

  }

  /**
   * Ajouter un theme.
   * @param theme Theme
   * @param imageFile Image
   */
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

  /**
   * Supprimer un theme.
   * @param theme Theme.
   */
  deleteTheme(theme: Theme) {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  /**
   * Récuperer les quizzes d'un theme.
   * @param themeId Identifiant un theme.
   */
  setQuizzesFromUrl(themeId: string) {
    this.http.get<Quiz[]>(this.themeUrl + '/' + themeId + '/quizzes').subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  /**
   * Recupere un quiz.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant d'un quiz.
   */
  setSelectedQuiz(themeId: string, quizId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });

  }

  /**
   * Ajoute un quiz.
   * @param themeId Identifiant du theme.
   * @param quiz Quiz.
   */
  addQuiz(themeId: string, quiz: Quiz) {
    this.http.post<Quiz>(this.themeUrl  + '/' +
    themeId +  '/quizzes/', quiz, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }

  /**
   * Supprime un quiz.
   * @param themeId Idnetifiant d'un quiz.
   * @param quiz Quiz.
   */
  deleteQuiz(themeId: string, quiz: Quiz) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }



  /**
   * Récupérer des questions d'un quiz.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant d'un quiz.
   */
  setQuestionsFromUrl(themeId: string, quizId: string) {
    this.http.get<Question[]>(this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId + '/questions').subscribe((questionsList) => {
      this.questions = questionsList;
      this.questions$.next(this.questions);
    });
  }

  /**
   * Récupère une question.
   * @param themeId Idnetifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   */
  setSelectedQuestion(themeId: string, quizId: string, questionId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
     quizId + '/questions' + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  /**
   * Ajoute une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param question QUestion.
   */
  addQuestion(themeId: string, quizId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions';
    this.http.post<Question>(urlWithId, question, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }


  /**
   * Mettre à jour un quiz.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param quiz Quiz.
   */
  updateQuiz(themeId: string, quizId: string, quiz: Quiz) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId;
    this.http.put<Quiz>(urlWithId, quiz, this.httpOptions).subscribe(() =>
    this.setQuizzesFromUrl(themeId));
  }


  /**
   * Supprimer une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param question Question.
   */
  deleteQuestion(themeId: string, quizId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + question.id;
    this.http.delete<Question>(urlWithId, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }

  /**
   * Mettre à jour à une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   * @param question Question.
   */
  updateQuestion(themeId: string, quizId: string, questionId: string, question: Question) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId;
    this.http.put<Question>(urlWithId, question, this.httpOptions).subscribe(() =>
    this.setQuestionsFromUrl(themeId, quizId));
  }

  /**
   * Recuperer les réponses d'une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   */
  setAnswersFromUrl(themeId: string, quizId: string, questionId: string) {
    this.http.get<Answer[]>(this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers').subscribe((answersList) => {
      this.answers = answersList;
      this.answers$.next(this.answers);
    });
  }


  /**
   * Récupère une réponse.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   * @param answerId Indentifiant de la réponse.
   */
  setSelectedAnswer(themeId: string, quizId: string, questionId: string, answerId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
     quizId + '/questions' + '/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }


  /**
   * Récupere les reponses d'une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Idnetifiant de la question.
   */
  setSelectedAnswers(themeId: string, quizId: string, questionId: string) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId + '/questions' + '/' + questionId + '/answers';
    this.http.get<Answer[]>(urlWithId).subscribe((answers) => {
      this.answersSelected$.next(answers);
    });
  }


  /**
   * Ajoute une réponse.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   * @param answer Réponse.
   */
  addAnswer(themeId: string, quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers';
    this.http.post<Answer>(urlWithId, answer, this.httpOptions).subscribe(() =>
    this.setAnswersFromUrl(themeId, quizId, questionId));
  }

 /**
  * Mettre à jour une réponse.
  * @param themeId Identifiant du theme.
  * @param quizId Identifiant du quiz.
  * @param questionId Identifiant de la question.
  * @param answerId Identifiant de la réponse.
  * @param answer Réponse.
  */
  updateAnswer(themeId: string, quizId: string, questionId: string, answerId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' + quizId
    + '/questions' + '/' + questionId + '/answers' + '/' + answerId;
    this.http.put<Answer>(urlWithId, answer, this.httpOptions).subscribe(() =>
    this.setAnswersFromUrl(themeId, quizId, questionId));
  }

  /**
   * Supprimer une question.
   * @param themeId Identifiant du theme.
   * @param quizId Identifiant du quiz.
   * @param questionId Identifiant de la question.
   * @param answer Reponse.
   */
  deleteAnswer(themeId: string, quizId: string, questionId: string, answer: Answer) {
    const urlWithId = this.themeUrl  + '/' + themeId +  '/quizzes/' +
    quizId + '/questions' + '/' + questionId + '/answers' + '/' + answer.id;
    this.http.delete<Answer>(urlWithId, this.httpOptions).subscribe(() =>
     this.setAnswersFromUrl(themeId, quizId, questionId));
  }

}

