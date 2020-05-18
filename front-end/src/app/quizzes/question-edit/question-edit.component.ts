import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  private questionForm: FormGroup;
  private question: Question;
  private quizId: string;
  private questionId: string;
  private themeId: string;
  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.quizService.questionSelected$.subscribe((question) => {
      this.question = question;
      console.log(this.question);
    });
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizService.setSelectedQuiz( this.themeId, this.quizId);
    this.quizService.setSelectedQuestion( this.themeId, this.quizId, this.questionId);
    this.navigationService.setPreviousUrl(['themes-list',  this.themeId, 'quiz-list',
    this.quizId, 'questions-list', this.question.id, 'answers-list']);
  }

  updateQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    if (questionToAdd.label === '') {
      questionToAdd.label = this.question.label;
    }
    this.quizService.updateQuestion( this.themeId, this.quizId, this.question.id,
       questionToAdd);
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

}
