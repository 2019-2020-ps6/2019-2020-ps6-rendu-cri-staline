import { Component, OnInit , Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';
import {RightsService} from '../../../services/rights.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private enableAdmin: boolean;

  private usersList: User[] = [];

  constructor(private router: Router,
              public userService: UserService,
              private rightsService: RightsService,
              private navigationService: NavigationService) {
    this.userService.users$.subscribe((user) => {
      this.usersList = user;
    });
    this.rightsService.enableAdmin$.subscribe(admin => {
      this.enableAdmin = admin;
    });

  }

  ngOnInit(): void {
    this.navigationService.setTitle('Acceuillis');
    if (this.enableAdmin === true) {
      this.navigationService.setPreviousUrl(['workspace']);
    } else {
      this.navigationService.setPreviousUrl(['home']);
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }

  addUser() {
    this.router.navigate(['users-list', 'add']);
  }

}
