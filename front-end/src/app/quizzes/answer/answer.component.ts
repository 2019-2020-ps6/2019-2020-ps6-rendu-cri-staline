import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {  Answer } from 'src/models/question.model';
import {RightsService} from '../../../services/rights.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  @Input()
  styleCheckBox: any;

  private enableAdmin: boolean;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();


  @Output()
  deleteAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor( private rightsService: RightsService, private router: Router) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
  }

  ngOnInit() {
  }

  selectAnswer() {
   this.answerSelected.emit(this.answer);
  }

  edit() {

  }

  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer cette réponse ?')) {
      this.deleteAnswer.emit(this.answer);
    }
    this.router.navigate(['./answers-list']);
  }
}
