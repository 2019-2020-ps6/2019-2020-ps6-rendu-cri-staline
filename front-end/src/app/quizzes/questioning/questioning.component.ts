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
  public quiz: Quiz ;
  public answersSelected: Answer[];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questions = quiz.questions;
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
    let bAllAnswerCorrect = true;
    this.answersSelected.forEach((answer) => {
      if (!answer.isCorrect) {
        bAllAnswerCorrect = false;
      }
    });
    if (bAllAnswerCorrect && this.answersSelected.length > 0) {
      if (this.currentQuestion === this.questions.length - 1) {
        this.router.navigate(['quiz-list']);
      } else {
        this.currentQuestion++;
      }
    }

  }

  quitQuiz() {

  }
}
