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
  private errors: string[] = [];
  private haveErrors = false;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private quizService: QuizService,
              private rightsService: RightsService) {

  }

  ngOnInit() {
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId =   this.route.snapshot.paramMap.get('quizId');
    this.check();
  }

  /**
   * Suppression de la question avec un message de confirmation
   */
  delete() {
    if (window.confirm('Etes-vous sur de vouloir supprimer cette question ?')) {
      this.quizService.deleteQuestion(this.themeId , this.quizId, this.question);
      this.router.navigate(['themes-list', this.themeId, 'quiz-list',
        this.quizId, 'questions-list']);
    }
  }

  /**
   * Redirige vers la liste des réponses de la question
   */
  answers() {
    this.rightsService.enableAdmin();
    this.router.navigate(['themes-list', this.themeId, 'quiz-list',
    this.question.quizId, 'questions-list', this.question.id, 'answers-list']);
  }

  /**
   * Vérifie qu'il y ait au moins une réponse et au moins une réponse juste, affiche des messages si ce n'est pas le cas
   */
  check() {
    this.haveErrors = false;
    this.errors = [];

    if (this.question.answers.length === 0) {
              this.errors.push('Question(s) sans réponses!');
              this.haveErrors = true;
    }
    let haveOneAnswerTrue = false;
    this.question.answers.forEach((answer) => {
      if (answer.isCorrect) {haveOneAnswerTrue = true; }
    });
    if (haveOneAnswerTrue === false) {
      this.errors.push('Question(s) sans réponses justes!');
      this.haveErrors = true;
    }
  }

}
