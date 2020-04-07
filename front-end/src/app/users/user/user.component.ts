import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  selectUser() {
    this.userSelected.emit(this.user);
    this.router.navigate(['quiz-list']);
  }
}
