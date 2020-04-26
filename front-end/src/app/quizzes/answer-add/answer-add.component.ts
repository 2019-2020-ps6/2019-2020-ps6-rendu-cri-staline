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
  private err = '';
  private alert = false;
  public answersList: Answer[] = [];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: ['']
    });
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answersList = answers;
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuestion(this.quizId, this.questionId);
    this.quizService.setSelectedAnswers(this.quizId, this.questionId);
  }

  addAnswer() {
    let answerToAdd: Answer = this.answerForm.getRawValue() as Answer;
    answerToAdd = {type: 'text', ...answerToAdd};
    if (this.checkForm) {
      this.quizService.addAnswer(this.quizId, this.questionId, answerToAdd);
      this.router.navigate(['quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list']);
    }
  }

  checkForm() {
   let atLeastOneGoodAnswer = false;
   this.answersList.forEach(answer => {
     if (answer.isCorrect) {
      atLeastOneGoodAnswer = true;
     }
   });
   if (atLeastOneGoodAnswer) {
    this.err = 'Au moins une bonne réponse pour la question.';
   }

   this.alert = atLeastOneGoodAnswer;
   return atLeastOneGoodAnswer;
  }

  cancel() {
    this.router.navigate(['quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list']);
  }

}
