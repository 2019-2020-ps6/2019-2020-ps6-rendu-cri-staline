import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router } from '@angular/router';
import { RightsService } from 'src/services/rights.service';
import { UserService } from '../../../services/user.service';
import { RefereeService } from '../../../services/referee.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  enableAdmin: boolean;

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router, private rightsService: RightsService,
              private userService: UserService,
              private refereeService: RefereeService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;

  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'users-list') {
      this.router.navigate(['home']);
    }
  }

  select() {
    this.refereeService.setUser(this.user);
    this.userSelected.emit(this.user);
  }

  delete() {
    this.deleteUser.emit(this.user);
    this.router.navigate(['users-list']);
  }

  addUser() {
    this.router.navigate(['user-add']);
  }


  edit() {

  }

  play() {
    this.userService.setSelectedUser(this.user.id);
    this.refereeService.setUser(this.user);
  }

}
