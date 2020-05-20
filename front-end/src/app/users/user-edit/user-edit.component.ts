import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router , ActivatedRoute} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  /**
   * Formulaire utilisateur.
   */
  public userForm: FormGroup;

  /**
   * L'utilisateur.
   */
  public user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router, private route: ActivatedRoute,
              private navigationService: NavigationService,
              private rightService: RightsService) {
      this.userService.userSelected$.subscribe((user) => {
        this.user = user;
      });
      this.userForm = this.formBuilder.group({
          firstName: [''],
          lastName: ['']
        });
      this.navigationService.setPreviousUrl(['users-list']);
      this.rightService.enableAdmin();
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.setSelectedUser(userId);
  }

  /**
   * Modifie un utilisateur en verifiant qu'on a bien entré un nom et prénom.
   */
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

  /**
   * Annule la modification d'un utilisateur et renvoie a la liste des utilisateurs.
   */
  cancel() {
    this.router.navigate(['users-list']);
  }
}
