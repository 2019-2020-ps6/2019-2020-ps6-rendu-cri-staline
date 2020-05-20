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
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router, private rightsService: RightsService,
              private userService: UserService,
              private refereeService: RefereeService) {
                this.rightsService.enableAdmin$.subscribe(admin => {
                  this.enableAdmin = admin;
                });

  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'users-list') {
      this.router.navigate(['home']);
    }
  }

  /**
   * Ramene a la page des details de l'utilisateur
   */
  seeMore() {
    this.refereeService.setUser(this.user);
    this.router.navigate(['users-list', this.user.id]);
  }

  delete() {
    this.deleteUser.emit(this.user);
    this.router.navigate(['users-list']);
  }

  /**
   * Redirige vers la page d'ajout d'un accueilli
   */
  addUser() {
    this.router.navigate(['users-list', 'add']);
  }

  /**
   * Redirige vers la page de modification d'un accueilli
   */
  edit() {
    this.router.navigate(['users-list', this.user.id, 'edit']);
  }

  /**
   * Selectionne l'utilisateur en tant que joueur
   */
  play() {
    this.userService.setSelectedUser(this.user.id);
    this.refereeService.setUser(this.user);
  }

}
