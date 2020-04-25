import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { Question, Answer } from '../../../models/question.model';
import { Result } from '../../../models/result.model';
import { QuizService } from 'src/services/quiz.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RefereeService } from 'src/services/referee.service';
@Component({
  selector: 'app-questioning',
  templateUrl: './questioning.component.html',
  styleUrls: ['./questioning.component.scss']
})
export class QuestioningComponent implements OnInit {

  public questions: Question[];
  public currentQuestion: number;
  public answers: Answer[];
  public quiz: Quiz ;
  public answersSelected: Answer[];
  public firstTry: boolean;
  public score: number;
  closeResult = '';
  constructor(private route: ActivatedRoute, private quizService: QuizService,
              private router: Router,
              private modalService: NgbModal,
              private refereeService: RefereeService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questions = quiz.questions;
      this.answers = this.questions[this.currentQuestion].answers;
      console.log(this.quiz);
    });
  }

  ngOnInit() {
    this.answersSelected = [];
    this.currentQuestion = 0;
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.score = 0;
    this.firstTry = true;
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

  }

  validAnswer(content) {
    console.log(this.score);
    const allAnswersCheckedCorrect = this.isAllAnswersCheckedCorrect();

    if (allAnswersCheckedCorrect && this.answersSelected.length > 0) {
        if (this.currentQuestion === this.questions.length - 1) {
          window.alert('redirection mais depuis validAnswer');
          let result: Result;
          if (this.firstTry) {
            this.score++;
          }
          result = {userId: '', quizId: '', score: this.score / this.questions.length, date: new Date().toLocaleString()};
          this.refereeService.addResult(result);
          this.firstTry = true;
          this.router.navigate(['quiz-list']);
        } else {
          this.open(content);
          this.answersSelected = [];
          this.currentQuestion++;
          if (this.firstTry) {
            this.score++;
          }
          this.firstTry = true;
          this.answers = this.questions[this.currentQuestion].answers;
        }
      } else {
        this.firstTry = false;
        this.deleteBadAnswers();
      }
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

  isAllAnswersCheckedCorrect() {
    const nbAnswersCorrect = this.getNbAnswersCorrect();
    let nbAnswersCorrectChecked = 0;
    this.answersSelected.forEach((answer) => {
      if (answer.isCorrect) {
        nbAnswersCorrectChecked++;
      } else {
        nbAnswersCorrectChecked--;
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

  quitQuiz() {
    if (window.confirm('Êtes-vous sûr de vouloir quitter ?')) {
      this.router.navigate(['quiz-list']);
      this.answersSelected = [];
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  retry() {
    this.answersSelected = [];
    this.currentQuestion = 0;
    this.shuffle(this.questions);
   // this.validAnswer(content);

  }

  // displayRating(contentRating) {
  //  this.open(contentRating);
  // }

}
