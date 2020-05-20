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

  private quizForm: FormGroup;
  private themeList: Theme[];
  private errors: string[] = [];
  private haveErrors = false;
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
   * Ajoute un quiz et renvoie a la liste des quiz
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
   * Verifie qu'il y ait bien un nom et un theme selectionné
   * @param un quiz que l'on veut qjouter
   * Affiche des messages d'erreur s'il manque un nom ou le theme
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
  checkValue() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.valid(quizToCreate);
  }
  cancel() {
    this.navigationService.previous();
  }

}
