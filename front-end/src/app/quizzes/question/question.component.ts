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

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer cette question ?')) {
      this.deleteQuestion.emit(this.question);
    }
  }

  goToAnswers() {
    this.router.navigate(['quiz-list', this.question.quizId, 'questions-list', this.question.id, 'answers-list']);
  }

  edit() {

  }
}
