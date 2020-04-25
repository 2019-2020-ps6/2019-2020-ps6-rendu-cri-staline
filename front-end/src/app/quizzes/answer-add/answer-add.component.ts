import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../../../models/question.model';

@Component({
  selector: 'app-answer-add',
  templateUrl: 'answer-add.component.html',
  styleUrls: ['answer-add.component.scss']
})
export class AnswerAddComponent implements OnInit {
  public answerForm: FormGroup;
  private questionId: string;
  private quizId: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuestion(this.quizId, this.questionId);
  }

  addAnswer() {
    const answerToAdd: Answer = this.answerForm.getRawValue() as Answer;
    this.quizService.addAnswer(this.quizId, this.questionId, answerToAdd);
  }

}
