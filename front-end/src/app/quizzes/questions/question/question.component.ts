import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {Quiz} from '../../../../models/quiz.model';

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

  goToAnswers() {
    this.router.navigate(['quiz-list', this.question.quizId, 'questions-list', this.question.id, 'answers-list']);
  }
}
