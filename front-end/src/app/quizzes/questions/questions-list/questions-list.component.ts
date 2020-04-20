import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {Quiz} from '../../../../models/quiz.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  public questionsList: Question[] = [];
  public quiz: Quiz;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionsList = quiz.questions;
      console.log(this.quiz);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

}
