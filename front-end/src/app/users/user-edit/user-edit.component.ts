import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router , ActivatedRoute} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
  public userForm: FormGroup;

  public user: User;

  constructor(public formBuilder: FormBuilder, public userService: UserService,
              private router: Router, private route: ActivatedRoute,
              private navigationService: NavigationService) {
      this.userService.userSelected$.subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
      this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: ['']
    });
      this.navigationService.setPreviousUrl(['users-list']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }
  updateUser() {
    const userToAdd: User = this.userForm.getRawValue() as User;
    if (userToAdd.lastName === '') {
      userToAdd.lastName = this.user.lastName;
    }
    if (userToAdd.firstName === '') {
      userToAdd.firstName = this.user.firstName;
    }
    this.userService.updateUser(this.user.id, userToAdd);
    this.router.navigate(['users-list']);
  }
  cancel() {
    this.router.navigate(['users-list']);
  }
}
