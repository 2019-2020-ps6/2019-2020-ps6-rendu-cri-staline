import { Component, OnInit } from '@angular/core';
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

  /**
   * Droit de modification.
   */
  private enableAdmin: boolean;

  /**
   * Liste des utilisateurs.
   */
  private usersList: User[] = [];

  /**
   *
   */
  private haveUsers: boolean;

  constructor(private router: Router,
              public userService: UserService,
              private rightsService: RightsService,
              private navigationService: NavigationService) {
    this.userService.users$.subscribe((user) => {
      this.usersList = user;
      if ( (this.usersList !== undefined ) && (this.usersList.length > 0)) {
        this.haveUsers = true;
      } else {
        this.haveUsers = false;
      }
    });
    this.rightsService.enableAdmin$.subscribe(admin => {
      this.enableAdmin = admin;
    });

  }

  ngOnInit(): void {
    this.haveUsers = false;
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

  /**
   * Redirige vers la page d'ajout d'un accueilli
   */
  addUser() {
    this.router.navigate(['users-list', 'add']);
  }

}
