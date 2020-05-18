import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../../../models/question.model';
import { NavigationService } from 'src/services/navigation.service';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-answer-add',
  templateUrl: 'answer-add.component.html',
  styleUrls: ['answer-add.component.scss']
})
export class AnswerAddComponent implements OnInit {
  private answerForm: FormGroup;
  private questionId: string;
  private quizId: string;
  private themeId: string;
  private err = '';
  private alert = false;
  private answersList: Answer[] = [];

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private rightsService: RightsService) {
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
    this .themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuestion(this.themeId, this.quizId, this.questionId);
    this.quizService.setSelectedAnswers(this.themeId, this.quizId, this.questionId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list',
     this.quizId, 'questions-list', this.questionId, 'answers-list']);

  }

  addAnswer() {
    let answerToAdd: Answer = this.answerForm.getRawValue() as Answer;
    answerToAdd = {type: 'text', ...answerToAdd};
    if (this.checkForm) {
      this.quizService.addAnswer(this.themeId, this.quizId, this.questionId, answerToAdd);
      this.rightsService.enableAdmin();
      this.navigationService.previous();

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
   this.navigationService.previous();
   this.rightsService.enableAdmin();
  }

}
