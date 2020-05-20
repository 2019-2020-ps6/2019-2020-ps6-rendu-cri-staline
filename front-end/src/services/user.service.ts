import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  /**
   * La liste des utilisateurs.
   */
  private users: User[];

  /**
   * Observable qui contient la liste des utilisateurs.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject(this.users);


  public userSelected$: Subject<User> = new Subject();

  /**
   * Url serveur pour les utilisateurs.
   */
  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  /**
   * Récupère les utilisateurs.
   */
  setUsersFromUrl() {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  /**
   * Ajoute un utilisateur.
   * @param user Utilisateur
   */
  addQuiz(user: User) {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  /**
   * Récupère un utilisateur.
   * @param userId Identifiant de l'utilisateur
   */
  setSelectedUser(userId: string) {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });

  }

 /**
 * Supprimer un utilisateur.
 * @param user Utilisateur.
 */
  deleteUser(user: User) {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  /**
   * Mettre à jour l'utilisateur.
   * @param index Identifiant utilisateur.
   * @param user Utilisateur.
   */
  updateUser(index: string, user: User) {
    const urlWithId = this.userUrl + '/' + index;
    this.http.put<User>(urlWithId, user, this.httpOptions).subscribe(() => {this.setUsersFromUrl(); });

  }

}

