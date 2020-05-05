import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Router } from '@angular/router';
import { RefereeService } from 'src/services/referee.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input()
  result: Result;

  private value: number;
  private rest: number;
  constructor(private router: Router, private refereeService: RefereeService) {

  }

  ngOnInit() {

    this.value = this.result.score * 100;
    this.rest = 100 - this.value;

  }

  display() {
    this.refereeService.setSelectedResult(this.result.id.toString());
    this.router.navigate(['users-list', this.result.userId, 'results', this.result.id]);
  }

}
