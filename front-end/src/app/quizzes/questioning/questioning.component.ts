import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public currentQuestion: Question;
  public quiz: Quiz ;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
      this.questions = this.quiz.questions;
      console.log(this.questions);
      this.currentQuestion = this.questions[0];
      console.log(this.currentQuestion);
    });

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  answerSelected(answer: Answer) {
    console.log('answerSelect() answer');
  }
}
