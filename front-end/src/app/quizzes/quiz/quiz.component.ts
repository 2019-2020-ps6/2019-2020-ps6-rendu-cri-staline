import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router } from '@angular/router';
import {RightsService} from '../../../services/rights.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  enableAdmin: boolean;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router: Router, private rightsService: RightsService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'users-list') {
      this.router.navigate(['home']);
    }
  }

  selectQuiz() {
   this.quizSelected.emit(this.quiz);
  }

  delete() {
    this.deleteQuiz.emit(this.quiz);
    this.router.navigate(['quiz-list']);
  }
}
