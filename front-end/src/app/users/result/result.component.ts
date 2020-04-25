import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input()
  result: Result;

  private quiz: Quiz;

  private value: number;
  private rest: number;
  constructor(private quizService: QuizService) {
      this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    this.quizService.setSelectedQuiz(this.result.quizId);
    this.value = this.result.score * 100;
    this.rest = 100 - this.value;

  }

  play() {

  }

}
