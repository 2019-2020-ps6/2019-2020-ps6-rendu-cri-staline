import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { RefereeService } from 'src/services/referee.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {


  public result: Result;
  public user: User;

  private value: number;
  private rest: number;
  constructor(private quizService: QuizService, private refereeService: RefereeService) {
      refereeService.resultSelected$.subscribe((rslt) => {
        this.result = rslt;
      });
  }

  ngOnInit() {
    this.user = this.refereeService.user;
  }

  init() {
    this.value = this.result.score * 100;
    this.rest = 100 - this.value;
  }

  play() {

  }

}
