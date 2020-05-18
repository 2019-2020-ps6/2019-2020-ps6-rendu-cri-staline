import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { RightsService } from 'src/services/rights.service';
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
              private route: ActivatedRoute,
              private quizService: QuizService,
              private rightsService: RightsService) {

  }

  ngOnInit() {
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
  }


  delete() {
   this.quizService.deleteQuestion(this.themeId , this.quizId, this.question);
   this.router.navigate(['themes-list', this.themeId, 'quiz-list',
    this.question.quizId, 'questions-list']);
  }

  answers() {
    this.rightsService.enableAdmin();
    this.router.navigate(['themes-list', this.themeId, 'quiz-list',
    this.question.quizId, 'questions-list', this.question.id, 'answers-list']);
  }

}
