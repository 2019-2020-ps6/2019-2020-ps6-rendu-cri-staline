import { Component, OnInit , Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import {User} from '../../../models/user.model';
import {RightsService} from '../../../services/rights.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  enableAdmin: boolean;

  public usersList: User[] = [];

  constructor(private router: Router, public userService: UserService, private rightsService: RightsService) {
    this.userService.users$.subscribe((user) => {
      this.usersList = user;
    });
    console.log(this.usersList);
    this.rightsService.enableAdmin$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;

  }

  ngOnInit(): void {
    if (this.enableAdmin === undefined && this.router.url !== 'users-list') {
      this.router.navigate(['home']);
    }
  }

  userSelected(user: User) {
    console.log('userSelect() users-list');
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
  goBack() {
    this.router.navigate(['workspace']);
  }

  addUser() {
    this.router.navigate(['user-add']);
  }

  goBackInGame() {
    this.router.navigate(['workspace']);
  }

}
