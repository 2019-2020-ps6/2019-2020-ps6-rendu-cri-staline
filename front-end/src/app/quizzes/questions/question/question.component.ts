import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../models/question.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  constructor(private router: Router) {

  }

  ngOnInit() {
  }
}
