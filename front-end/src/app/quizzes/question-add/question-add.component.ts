import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-question-add',
  templateUrl: 'question-add.component.html',
  styleUrls: ['question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  public questionForm: FormGroup;
  public quiz: Quiz;
  public quizId: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService,
              private router: Router, private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuiz(this.quizId);
    this.navigationService.setPreviousUrl(['themes-list', themeId, 'quiz-list', this.quizId, 'questions-list']);
  }

  addQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    this.quizService.addQuestion(this.quizId, questionToAdd);
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

}
