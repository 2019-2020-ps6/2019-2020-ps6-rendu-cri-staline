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

  public user: User;

  public resultSelected$: Subject<Result> = new Subject();

  private userUrl = serverUrl + '/users';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {

  }

  setSelectedResult(resultId: string) {
    const urlWithId = serverUrl + '/users/' + this.user.id + '/results/' + resultId;
    this.http.get<Result>(urlWithId).subscribe((result) => {
      this.resultSelected$.next(result);
    });

  }

  setUser(user) {
    this.user = user;
  }

  addResult(result: Result, quizId: number) {
    this.userUrl = serverUrl + '/users/' + result.userId + '/results';
    const req = {...result, quizId};
    console.log(result);
    this.http.post<Result>(this.userUrl, req, this.httpOptions).subscribe();
  }



}

