import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.scss']
})
export class AnswerEditComponent implements OnInit {
  private answerForm: FormGroup;
  private answer: Answer;
  private answerList: Answer[] = [];
  private quizId: string;
  private questionId: string;
  private answerId: string;
  private themeId: string;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService,
              private router: Router, private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: ['']
    });
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answerList = answers;
    });
    this.quizService.answerSelected$.subscribe((answerTmp) => {
        this.answer = answerTmp;
        console.log(this.answer);
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.answerId = this.route.snapshot.paramMap.get('answerId');
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.navigationService.setPreviousUrl(['themes-list', this.themeId,
    'quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list']);
    this.quizService.setSelectedQuestion(this.quizId, this.questionId);
    this.quizService.setSelectedAnswers(this.quizId, this.questionId);
    this.quizService.setSelectedAnswer(this.quizId, this.questionId, this.answerId);
    }

  updateAnswer() {
    let answerToAdd: Answer = this.answerForm.getRawValue() as Answer;
    answerToAdd = {type: 'text', ...answerToAdd};
    this.quizService.updateAnswer(this.quizId, this.questionId, this.answerId, answerToAdd);
    this.navigationService.previous();
  }

  cancel() {
    this.navigationService.previous();
  }

}
