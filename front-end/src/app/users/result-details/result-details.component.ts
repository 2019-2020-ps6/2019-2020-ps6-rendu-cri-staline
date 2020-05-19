import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { RefereeService } from 'src/services/referee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {



  private result: Result;
  private user: User;

  private value: number;
  private rest: number;

  private userId: string;

  constructor(private quizService: QuizService,
              private refereeService: RefereeService,
              private route: ActivatedRoute,
              private router: Router) {
      refereeService.resultSelected$.subscribe((rslt) => {
        this.result = rslt;
        console.log(this.result);
      });
  }

  ngOnInit() {
    this.user = this.refereeService.user;
    this.userId = this.route.snapshot.paramMap.get('userId');
  }


  init() {
    this.value = this.result.score * 100;
    this.rest = 100 - this.value;
  }
  back() {
    this.router.navigate(['users-list', this.userId]);
  }

  play() {

  }

}
