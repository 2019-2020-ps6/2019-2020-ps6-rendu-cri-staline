import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {  Answer } from 'src/models/question.model';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() {
  }

  ngOnInit() {
  }

  selectAnswer() {
   this.answerSelected.emit(this.answer);
  }
}
