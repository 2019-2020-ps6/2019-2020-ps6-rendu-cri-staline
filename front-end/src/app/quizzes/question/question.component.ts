import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  private themeId: string;
  private quizId: string;
  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
  }


  delete() {
  }

  goToAnswers() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list',
    this.question.quizId, 'questions-list', this.question.id, 'answers-list']);
  }

  edit() {

  }
}
