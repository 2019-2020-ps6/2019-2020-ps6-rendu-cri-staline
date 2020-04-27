import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-quiz-list',
  templateUrl: './theme-quiz-list.component.html',
  styleUrls: ['./theme-quiz-list.component.scss']
})
export class ThemeQuizListComponent implements OnInit {

  public quizList: Quiz[];

  constructor(private route: ActivatedRoute, private router: Router,
              public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizList = quizzes;
    });
  }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setQuizzesByTheme(id);
  }
}
