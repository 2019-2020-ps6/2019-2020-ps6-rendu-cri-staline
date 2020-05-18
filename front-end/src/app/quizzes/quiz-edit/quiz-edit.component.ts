import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  private quizForm: FormGroup;
  private quiz: Quiz;
  private themeList: Theme[] = [];
  private themeId: string;

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
    });
    quizService.themes$.subscribe(themes => {
      this.themeList = themes;
    });

    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: ['']
    });
  }

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuiz(this.themeId, quizId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list', quizId, 'questions-list']);
  }

  updateQuiz() {
    const quizToEdit: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToEdit);
    if (quizToEdit.name === '') {
      quizToEdit.name = this.quiz.name;
      console.log('Ok');
    }

    this.quizService.updateQuiz(this.themeId, this.quiz.id, quizToEdit);
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

}
