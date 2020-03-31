import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {
  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: ['']
    });
  }

  ngOnInit() {
  }

  addUser() {
    const userToAdd: User = this.userForm.getRawValue() as User;
    this.userService.addQuiz(userToAdd);
  }
}
