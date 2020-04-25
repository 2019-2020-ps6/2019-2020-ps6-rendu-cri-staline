import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {  Answer } from 'src/models/question.model';
import {RightsService} from '../../../services/rights.service';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  private enableAdmin: boolean;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor( private rightsService: RightsService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
  }

  ngOnInit() {
  }

  selectAnswer() {
   this.answerSelected.emit(this.answer);
  }
}
