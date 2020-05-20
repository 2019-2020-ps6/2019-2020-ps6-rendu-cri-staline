import { Component, OnInit} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrls: ['./theme-add.component.scss']
})

export class ThemeAddComponent implements OnInit {

  /**
   * Formulaire theme.
   */
  private themeForm: FormGroup;

  /**
   * Image.
   */
  private selectedFile: File;

  /**
   * Messages d'erreur
   */
  private errors: string[] = [];

  /**
   * Le formulaire comporte une erreur.
   */
  private haveErrors = false;

  constructor(public formBuilder: FormBuilder,
              public quizService: QuizService,
              private navigationService: NavigationService) {
    this.themeForm = this.formBuilder.group({
      themeName: [''],
      themeImage: [null, Validators.required],
    });
    this.navigationService.setPreviousUrl(['themes-list']);
  }

  ngOnInit() {
  }

  /**
   * Ajoute un theme.
   */
  addTheme() {
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    themeToAdd.themeImage = this.selectedFile;
    this.valid(themeToAdd);
    if (!this.haveErrors) {
     this.quizService.addTheme(themeToAdd, themeToAdd.themeImage).subscribe((event) => {
        console.log(event);
      }, error => {
        console.error(error);
      });
    }
    this.quizService.setThemesFromUrl();
    this.navigationService.previous();
  }
onFileChange(event) {
  this.selectedFile = event.target.files[0] as File;
}

  /**
   * Verifie que les informations du thème sont renseignés.
   * @param themeToAdd Theme que l'on veut ajouter
   * Affiche un message d'erreur s'il n'y a pas de nom.
   */
  valid(themeToAdd) {
  this.haveErrors = false;
  this.errors = [];
  if (themeToAdd.themeName === '') {
    this.errors.push('Entrez un nom.');
    this.haveErrors = true;
  }

}

  /**
   * Annule la creation du theme et renvoie a la liste des themes.
   */
  cancel() {
    this.navigationService.previous();
  }

  /**
   * Vérfie les valeurs du formulaire.
   */
  checkValue() {
    const themeToAdd: Theme = this.themeForm.getRawValue() as Theme;
    this.valid(themeToAdd);
  }

}
