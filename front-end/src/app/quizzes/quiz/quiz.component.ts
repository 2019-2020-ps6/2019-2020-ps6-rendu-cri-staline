import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router, ActivatedRoute } from '@angular/router';
import { RefereeService } from 'src/services/referee.service';
import { RightsService } from 'src/services/rights.service';
import { QuizService } from 'src/services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';
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

  @Output()
  questionsQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  /**
   * Droit de modification.
   */
  private enableAdmin: boolean;

  /**
   * identifiant du theme.
   */
  private themeId: string;

  /**
   * Messages d'erreurs.
   */
  private errors: string[] = [];

  /**
   * Le quiz comporte des erreurs.
   */
  private haveErrors = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rightsService: RightsService,
              private quizService: QuizService,
              private navigationService: NavigationService) {
      this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });
  }


  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'quiz-list') {
      this.router.navigate(['home']);
    } else if (this.enableAdmin === true) {
      this.check();
    }
    this.themeId = this.route.snapshot.paramMap.get('themeId');

  }

  /**
   * Redirection vers la page de jeu du quiz.
   */
  play() {
    this.router.navigate(['quiz', this.quiz.id], {fragment: 'question'});
    this.quizService.setSelectedQuiz(  this.themeId, this.quiz.id);
    this.navigationService.setTitle('Quiz ' + this.quiz.name);
  }

  /**
   * Supprime un quiz avec un message de confirmation.
   */
  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuiz( this.themeId, this.quiz);
      this.quizService.setQuizzesFromUrl(this.themeId);
      this.router.navigate(['themes-list', this.themeId, 'quiz-list']);
    }
  }

  /**
   * Ramene a la liste des questions du quiz dans l'espace accompagnateur.
   */
  questions() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quiz.id, 'questions-list']);
    this.navigationService.setTitle('Quiz ' + this.quiz.name);
    this.rightsService.enableAdmin();
  }

  /**
   * Verifie qu'il y ait au moins une question avec au moins une reponse juste
   * Met à jour le(s) message(s) d'erreur(s).
   */
  check() {
    this.haveErrors = false;
    this.errors = [];

    if (this.quiz.questions.length === 0) {
        this.errors.push('Pas de questions!');
        this.haveErrors = true;
      } else {
        this.quiz.questions.forEach((question) => {
            let haveOneAnswerTrue = false;
            if (question.answers.length === 0) {
              this.errors.push('Question(s) sans réponses!');
              this.haveErrors = true;
            }
            question.answers.forEach((answer) => {
                if (answer.isCorrect) {
                  haveOneAnswerTrue = true;
                }
            });
            if (haveOneAnswerTrue === false) {
              this.errors.push('Question(s) sans réponses justes!');
              this.haveErrors = true;
            }
          });
    }

  }

}
