import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  delete() {
    this.deleteQuestion.emit(this.question);
  }
}
