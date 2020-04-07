import { Component, OnInit , Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  enableAdmin: boolean;

  public usersList: User[] = [];

  constructor(private router: Router, public userService: UserService) {
    this.userService.users$.subscribe((user) => {
      this.usersList = user;
      console.log(this.usersList);
    });

  }

  ngOnInit(): void {

  }

  userSelected(user: User) {
    console.log('userSelect() users-list');
  }

}
