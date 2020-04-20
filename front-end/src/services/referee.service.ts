import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import {User} from '../models/user.model';
import {Result} from '../models/result.model';
import {Quiz} from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class RefereeService {

  private user: User;
  private quiz: Quiz;

  private userUrl = serverUrl + '/users';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {

  }

  setPlayer(user: User) {
    this.user = user;
  }

  setQuiz(quiz: Quiz) {
    this.quiz = quiz;
  }

  addResult(result: Result) {
    this.userUrl = serverUrl + '/users/' + this.user.id + '/results';
    result.quizId = this.quiz.id.toString();
    result.userId = this.user.id.toString();
    console.log(result);
    this.http.post<Result>(this.userUrl, result, this.httpOptions).subscribe();
  }


}

