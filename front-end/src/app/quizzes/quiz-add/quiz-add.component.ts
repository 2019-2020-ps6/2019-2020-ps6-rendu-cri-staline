import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Theme } from '../../../models/theme.model';
import {Router, ActivatedRoute} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})
export class QuizAddComponent implements OnInit {

  /**
   * Formulaire question.
   */
  private quizForm: FormGroup;

  /**
   * Liste des themes.
   */
  private themeList: Theme[];

  /**
   * Messages d'erreurs.
   */
  private errors: string[] = [];

  /**
   * Le formulaire a des erreurs.
   */
  private haveErrors = false;

  /**
   * Identifiant du theme.
   */
  private themeId: string;

  constructor(public formBuilder: FormBuilder,
              public quizService: QuizService,
              private router: Router,
              private navigationService: NavigationService ,
              private route: ActivatedRoute) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: ['']
    });
    this.quizService.themes$.subscribe(themes => {
      this.themeList = themes;
    });
  }


  ngOnInit() {
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setThemesFromUrl();
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list']);
  }

  /**
   * Ajoute un quiz et renvoie a la liste des quizzes.
   */
  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToCreate);
    this.valid(quizToCreate);
    if (!this.haveErrors) {
    this.quizService.addQuiz( this.themeId, quizToCreate);
    this.navigationService.previous();
    }
  }

  /**
   * Verifie que les informations du quiz sont renseignés.
   * Met à jour le(s) message(s) d'erreur(s).
   * @param quizToCreate Quiz que l'on veut ajouter
   */
  valid(quizToCreate) {
    this.haveErrors = false;
    this.errors = [];
    if (quizToCreate.themeId === '') {
      this.errors.push('Sélectionnez un thème.');
      this.haveErrors = true;
    }
    if (quizToCreate.name === '') {
      this.errors.push('Entrez un nom.');
      this.haveErrors = true;
    }

  }

  /**
   * Verifie l'état du formulaire àprès chaque modification
   * @param quizToCreate Quiz que l'on veut ajouter
   */
  checkValue() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.valid(quizToCreate);
  }

  /**
   * Redirige vers la page du quiz.
   */
  cancel() {
    this.navigationService.previous();
  }

}
