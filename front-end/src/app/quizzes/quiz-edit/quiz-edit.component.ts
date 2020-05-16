import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../models/theme.model';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  public quizForm: FormGroup;
  public quiz: Quiz;
  public themeList: Theme[] = [];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router,
              private route: ActivatedRoute, private themeService: ThemeService,
              private navigationService: NavigationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
    });
    themeService.themes$.subscribe(themes => {
      this.themeList = themes;
    });

    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: ['']
    });
  }

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuiz(quizId);
    this.navigationService.setPreviousUrl(['themes-list', themeId, 'quiz-list', quizId, 'questions-list']);
  }

  updateQuiz() {
    const quizToEdit: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToEdit);
    if (quizToEdit.name === '') {
      quizToEdit.name = this.quiz.name;
    }

    this.quizService.updateQuiz(this.quiz.id, quizToEdit);
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

}
