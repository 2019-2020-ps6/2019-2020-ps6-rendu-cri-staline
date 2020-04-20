import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      imageFile: [null, Validators.required],
    });
  }
  public userForm: FormGroup;
  public selectedFile: File;

  ngOnInit() {
  }
  addUser() {
    const userToAdd: User = this.userForm.getRawValue() as User;
    userToAdd.imageFile = this.selectedFile;
    console.log(userToAdd);
    this.userService.addQuiz(userToAdd);
    this.router.navigate(['users-list']);
  }


  onFileChange(event) {
    this.selectedFile = event.target.files[0] as File;
  }
}
