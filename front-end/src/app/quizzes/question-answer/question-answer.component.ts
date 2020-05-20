import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question, Answer} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  answersCorrect: number[];

  /**
   * Liste des reponses.
   */
  private answers: Answer[];

  /**
   * Style checkbox réponse.
   */
  private styleCheckBox: any = {
    transform: 'scale(1)',
  };

  constructor() {}

  private map = {};
  ngOnInit() {
    this.answers = this.question.answers;
    this.answers.forEach(answer => {
      this.map[answer.id] = false;
      this.answersCorrect.forEach(answerId => {
        if (parseInt(answer.id, 10) === answerId) {
          this.map[answer.id] = true;
        }
      });
    });
  }

}
