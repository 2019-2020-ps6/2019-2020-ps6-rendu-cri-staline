import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Subject } from 'rxjs';
import {User} from '../models/user.model';
import {Result} from '../models/result.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class RefereeService {

  /**
   * Utilisateur sélectionné.
   */
  public user: User;


  public resultSelected$: Subject<Result> = new Subject();
  private userUrl = serverUrl + '/users';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {

  }

  /**
   * Récupère un résultat.
   * @param resultId Identifiant du résultat
   */
  setSelectedResult(resultId: string) {
    const urlWithId = serverUrl + '/users/' + this.user.id + '/results/' + resultId;
    this.http.get<Result>(urlWithId).subscribe((result) => {
      this.resultSelected$.next(result);
    });

  }

  /**
   * Définit l'utilisateur sélectionné.
   * @param user Utilisateur
   */
  setUser(user) {
    this.user = user;
  }

  /**
   * Ajoute un résultat.
   * @param result Le résultat sur le quiz.
   * @param quizId L'identifiant du quiz.
   */
  addResult(result: Result, quizId: number) {
    this.userUrl = serverUrl + '/users/' + result.userId + '/results';
    const req = {...result, quizId};
    this.http.post<Result>(this.userUrl, req, this.httpOptions).subscribe();
  }



}

