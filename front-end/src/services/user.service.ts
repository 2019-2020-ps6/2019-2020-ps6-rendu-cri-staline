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
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of users.
   * The list is retrieved from the mock.
   */
  private users: User[];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject(this.users);

  public userSelected$: Subject<User> = new Subject();

  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  setUsersFromUrl() {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  addQuiz(user: User) {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  setSelectedUser(userId: string) {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });

  }

  deleteUser(user: User) {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  updateUser(index: string, user: User) {
    const urlWithId = this.userUrl + '/' + index;
    this.http.put<User>(urlWithId, user, this.httpOptions).subscribe(() => {this.setUsersFromUrl(); });

  }

}

