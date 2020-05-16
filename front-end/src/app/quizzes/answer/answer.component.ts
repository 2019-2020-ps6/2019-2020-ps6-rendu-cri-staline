import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {  Answer } from 'src/models/question.model';
import {RightsService} from '../../../services/rights.service';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  @Input()
  styleCheckBox: any;

  private enableAdmin: boolean;

  private themeId: string;
  private quizId: string;
  private questionId: string;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();


  @Output()
  deleteAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor( private rightsService: RightsService,
               private router: Router,
               private route: ActivatedRoute,
               private quizService: QuizService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
  }

  ngOnInit() {
    console.log(this.answer);
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
  }

  selectAnswer() {

   this.answerSelected.emit(this.answer);
  }

  edit() {
      this.quizService.setSelectedAnswer(this.quizId, this.questionId, this.answer.id);
      this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quizId,
      'questions-list', this.questionId, 'answers-list', this.answer.id, 'edit']);
  }

  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer cette réponse ?')) {
      this.deleteAnswer.emit(this.answer);
    }
    this.router.navigate(['./answers-list']);
  }
}
