import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Theme } from '../../../models/theme.model';
import {Router, ActivatedRoute} from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})
export class QuizAddComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public quizService: QuizService,
              private router: Router, private themeService: ThemeService,
              private navigationService: NavigationService , private route: ActivatedRoute) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: ['']
    });
    themeService.themes$.subscribe(themes => {
      this.themeList = themes;
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public themeList: Theme[];

  public errors: string[] = [];
  public haveErrors = false;

  public themeId: string;
  ngOnInit() {
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.themeService.setThemesFromUrl();
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list']);
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToCreate);
    this.valid(quizToCreate);
    if (!this.haveErrors) {
    this.quizService.addQuiz(quizToCreate);
    this.router.navigate(['quiz-list']);
    }
  }
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