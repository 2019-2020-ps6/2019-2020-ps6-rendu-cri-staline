import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  selectQuiz() {
   this.quizSelected.emit(this.quiz);
  }

  delete() {
    this.deleteQuiz.emit(this.quiz);
    this.router.navigate(['quiz-list']);
  }
}
