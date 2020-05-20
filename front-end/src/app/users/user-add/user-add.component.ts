import { Component, OnInit} from '@angular/core';
import { User } from '../../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {

  /**
   * Formulaire utilisateur.
   */
  public userForm: FormGroup;

  /**
   * Image du profil.
   */
  public selectedFile: File;

  /**
   * Message d'erreurs.
   */
  public errors: string[] = [];

  /**
   * Le formualire comporte des erreurs.
   */
  public haveErrors = false;

  constructor(public formBuilder: FormBuilder, public userService: UserService,
              private router: Router, private navigationService: NavigationService,
              private rightsService: RightsService) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      imageFile: [null, Validators.required],
    });
    this.navigationService.setPreviousUrl(['users-list']);
    this.rightsService.enableAdmin();
  }

  ngOnInit() {
  }
  addUser() {
    const userToAdd: User = this.userForm.getRawValue() as User;
    userToAdd.imageFile = this.selectedFile;
    console.log(userToAdd);
    this.valid(userToAdd);
    if (!this.haveErrors) {
      this.userService.addQuiz(userToAdd);
      this.router.navigate(['users-list']);
    }
  }


  onFileChange(event) {
    this.selectedFile = event.target.files[0] as File;
  }
  cancel() {
    this.router.navigate(['workspace']);
  }

  /**
   * Verifie qu'on a bien entré un nom et prénom
   * @param l'utiliseur que l'on veut ajouter
   * Affiche des messages d'erreur s'il manque un nom et prenom
   */
  valid(userToAdd) {
    this.haveErrors = false;
    this.errors = [];
    if (userToAdd.firstName === '') {
      this.errors.push('Entrez un prénom.');
      this.haveErrors = true;
    }
    if (userToAdd.lastName === '') {
      this.errors.push('Entrez un nom.');
      this.haveErrors = true;
    }

  }

  /**
   * Vérifie les valeurs du formulaire.
   */
  checkValue() {
    const userToAdd: User = this.userForm.getRawValue() as User;
    this.valid(userToAdd);
  }
}
