import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router , NavigationEnd } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { Question, Answer } from '../../../models/question.model';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RefereeService } from 'src/services/referee.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-questioning',
  templateUrl: './questioning.component.html',
  styleUrls: ['./questioning.component.scss']
})
export class QuestioningComponent implements OnInit {

  private user: User;
  private questions: Question[];
  private currentQuestion: number;
  private answers: Answer[];
  private quiz: Quiz ;
  private answersSelected: Answer[];
  private answersFirstTry: number[];
  private firstTry: boolean;
  private mEndQuiz: boolean;
  private score: number;
  private timeStart: string;
  private closeResult = '';
  private currentRate: number;
  private help = '';

  private answersCorrect: string[] = [];

  // displayRating(contentRating) {
  //  this.open(contentRating);
  // }

  private styleBtnValid: any = {
      margin: '20px',
      color: 'black'
  };
  private styleCheckBox: any = {};

  private styleAnimation = {
    animation : 'bigsmall 1s infinite',
    'animation-direction': 'alternate-reverse',
    'font-size': '30px'
  };

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private router: Router,
              private modalService: NgbModal,
              private refereeService: RefereeService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questions = quiz.questions;
      this.answers = this.questions[this.currentQuestion].answers;
      this.currentRate = this.questions.length;
    });

  }

  ngOnInit() {
    this.answersSelected = [];
    this.answersFirstTry = [];
    this.currentQuestion = 0;
    this.score = 0;
    this.firstTry = true;
    this.timeStart = Date.now().toLocaleString();
    this.user = this.refereeService.user;
    this.mEndQuiz = false;
    this.setTextHelp();
  }
  open(content) {
    return this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * Vérifie si une réponse n'est pas déjà cochée, sinon ajoute la réponse à la liste des réponses séléctionnées
   * @param une reponse cochée
   */
  answerSelected(newAnswer: Answer) {
    let bAlreadySelect = false;
    this.answersSelected.forEach((answer) => {
      if (answer === newAnswer) {
        bAlreadySelect = true;
      }
    });
    if (bAlreadySelect) {
      const newAnswers = this.answersSelected.filter((answer) => newAnswer !== answer);
      this.answersSelected = newAnswers;
    } else {
      this.answersSelected.push(newAnswer);
    }
    this.setTextHelp();
  }

  /**
   * Valide la question si toutes les réponses justes sont cochées, et passe à la question suivante ou termine le quiz
   * Supprime les mauvaises reponses cochees
   */
  validAnswer(content) {
    const allAnswersCheckedCorrect = this.isAllAnswersCheckedCorrect();

    if (allAnswersCheckedCorrect && this.answersSelected.length > 0) {
        if (this.firstTry && this.mEndQuiz === false) {
          this.score++;
        }
        console.log(this.score);
        this.firstTry = true;
        if (this.currentQuestion === this.questions.length - 1) {
          this.mEndQuiz = true;
          this.endQuiz(content);
        } else {
          this.nextQuestion(content);
        }
      } else {
        this.firstTry = false;
        this.deleteBadAnswers();
      }
    this.setTextHelp();
  }

  /**
   * @return le nombre de reponses justes pour une question
   */
  getNbAnswersCorrect() {
    let nbAnswersCorrect = 0;
    this.answers.forEach((answer) => {
      if (answer.isCorrect) {
        nbAnswersCorrect++;
      }
    });
    return nbAnswersCorrect;
  }

  /**
   * Termine le quiz et permet la redirection vers le menu principal, la liste des quiz ou de recommencer le quiz
   */
  endQuiz(content) {
    this.setAnswersCorrect();
    const modalRef = this.open(content);
    // tslint:disable-next-line: no-shadowed-variable
    modalRef.result.then((result) => {
      switch (result) {
        case 'retry':
          this.pushResult();
          this.retry();
          break;
        case 'quit':
          this.pushResult();
          this.quitQuiz();
          break;
        case 'home':
          this.pushResult();
          this.goToHomePage();
          break;
        default:
          break;
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  pushResult() {
    const result: Result = {
      answersId: this.answersFirstTry,
      userId: parseInt(this.user.id, 10),
      score: this.score / this.questions.length,
      date: new Date().toUTCString(),
      startingTime: this.timeStart,
      endTime: new Date().toUTCString(),
    };
    this.refereeService.addResult(result, parseInt(this.quiz.id, 10));
  }
  nextQuestion(content) {
    this.setAnswersCorrect();
    const modalRef = this.open(content);
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.answersSelected = [];
      this.currentQuestion++;
      this.setTextHelp();
      this.answers = this.questions[this.currentQuestion].answers;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.answers = this.questions[this.currentQuestion].answers;
  }

  /**
   * Verifie que toutes les reponses correctes sont cochees
   * @return Vrai si le nombre de reponse cochees justes est egale au nombre de reponses justes de la question
   */
  isAllAnswersCheckedCorrect() {
    const nbAnswersCorrect = this.getNbAnswersCorrect();
    let nbAnswersCorrectChecked = 0;
    this.answersSelected.forEach((answer) => {
      if (answer.isCorrect) {
        nbAnswersCorrectChecked++;
      } else {
        nbAnswersCorrectChecked--;
      }
      if (this.firstTry) {
        this.answersFirstTry.push(parseInt(answer.id, 10));
      }

    });
    return nbAnswersCorrect === nbAnswersCorrectChecked;
  }

  /**
   * Supprime les mauvaises reponses cochees
   */
  deleteBadAnswers() {

    const answersToDelete = this.answersSelected.filter((answer) => !answer.isCorrect);
    answersToDelete.forEach((answerToDlete) => {
      const newArrayAnswers = this.answers.filter((answer) => answerToDlete !== answer);
      const newArrayAnswersSelected = this.answersSelected.filter((answer) => answerToDlete !== answer);
      this.answers = newArrayAnswers;
      this.answersSelected = newArrayAnswersSelected;
    });
  }

  /**
   * Ajoute les reponses correctes d'une question dans un array
   */
  setAnswersCorrect() {
    this.answersCorrect = [];
    if (this.questions !== undefined) {
    this.answers.forEach(answer => {
      if (answer.isCorrect) {
        this.answersCorrect.push(answer.value);
      }
    });
  }
  }

  /**
   * Quitte le quiz et renvoie a la liste des quiz avec un message de confirmation
   */
  quitQuiz() {
    if (window.confirm('Êtes-vous sûr de vouloir quitter ?')) {
      this.router.navigate(['quiz-list']);
      this.answersSelected = [];
    }
  }

  shuffle(object) {
    const a: any = object;
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  /**
   * Recommence le quiz avec les questions dans un ordre different
   */
  retry() {
    console.log('Retrying...');
    this.score = 0;
    this.mEndQuiz = false;
    this.questions = this.shuffle(this.quiz.questions);
    this.currentQuestion = 0;
    this.answers = [];
    this.answers = this.questions[this.currentQuestion].answers;
    this.firstTry = true;
    this.setTextHelp();
    this.answersSelected = [];
    console.log('shuffle is done , questions:', JSON.stringify(this.questions));
    console.log('answers:', this.answers);
   // this.validAnswer(content);

  }

  /**
   * Donne des consignes lors du deroulement du quiz
   */
  setTextHelp() {
    if (this.answersSelected.length === 0) {
      this.help = 'Choisir une ou plusieurs réponses en cochant la ou les cases.';
      this.styleBtnValid = {};
      this.styleCheckBox = this.styleAnimation;
    } else {
      this.help = 'Valide ta réponse avec Valider.';
      this.styleBtnValid = this.styleAnimation;
      this.styleCheckBox = {};
    }
  }

  /**
   * Renvoie au menu principal
   */
  goToHomePage() {
    this.router.navigate(['home']);
  }


}
