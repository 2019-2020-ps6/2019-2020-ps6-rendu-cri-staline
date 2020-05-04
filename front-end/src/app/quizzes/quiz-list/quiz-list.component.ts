import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import {RightsService} from '../../../services/rights.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public enableAdmin: boolean;

  constructor(private router: Router, public quizService: QuizService, private rightsService: RightsService) {
    this.quizService.quizzes$.subscribe((quiz) => {this.quizList = quiz;

                                                   console.log(this.quizList);
    });
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
    console.log(this.enableAdmin);
  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'users-list') {
      this.router.navigate(['home']);
    }
  }

  quizSelected(quiz: Quiz) {
    console.log('quizSelect() quiz-list');
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  goBack() {
    this.router.navigate(['workspace']);
  }
}
