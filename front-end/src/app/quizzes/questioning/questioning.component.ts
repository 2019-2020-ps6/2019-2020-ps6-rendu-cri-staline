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
  public user: User;
  public questions: Question[];
  public currentQuestion: number;
  public answers: Answer[];
  public quiz: Quiz ;
  public answersSelected: Answer[];
  public answersFirstTry: number[];
  public firstTry: boolean;
  public mEndQuiz: boolean;
  public score: number;
  public timeStart: string;
  public closeResult = '';
  public currentRate: number;
  public help = '';

  public answersCorrect: string[] = [];

  // displayRating(contentRating) {
  //  this.open(contentRating);
  // }

  public styleBtnValid: any = {
      margin: '20px',
      color: 'black'
  };
  public styleCheckBox: any = {};

  public styleAnimation = {
    animation : 'bigsmall 1s infinite',
    'animation-direction': 'alternate-reverse',
    'font-size': '30px'
  };

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

  getNbAnswersCorrect() {
    let nbAnswersCorrect = 0;
    this.answers.forEach((answer) => {
      if (answer.isCorrect) {
        nbAnswersCorrect++;
      }
    });
    return nbAnswersCorrect;
  }
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

  deleteBadAnswers() {

    const answersToDelete = this.answersSelected.filter((answer) => !answer.isCorrect);
    answersToDelete.forEach((answerToDlete) => {
      const newArrayAnswers = this.answers.filter((answer) => answerToDlete !== answer);
      const newArrayAnswersSelected = this.answersSelected.filter((answer) => answerToDlete !== answer);
      this.answers = newArrayAnswers;
      this.answersSelected = newArrayAnswersSelected;
    });
  }
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

  goToHomePage() {
    this.router.navigate(['home']);
  }


}
