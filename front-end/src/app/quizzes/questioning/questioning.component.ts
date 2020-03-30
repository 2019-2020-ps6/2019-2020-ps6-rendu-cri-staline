import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { Question, Answer } from '../../../models/question.model';
import { QuizService } from 'src/services/quiz.service';

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

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) {
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

  validAnswer() {

    const allAnswersCheckedCorrect = this.isAllAnswersCheckedCorrect();

    if (allAnswersCheckedCorrect && this.answersSelected.length > 0) {
      if (this.currentQuestion === this.questions.length - 1) {
        this.router.navigate(['quiz-list']);
      } else {
        this.answersSelected = [];
        this.currentQuestion++;
        this.answers = this.questions[this.currentQuestion].answers;
      }
    } else {
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

  }
}
