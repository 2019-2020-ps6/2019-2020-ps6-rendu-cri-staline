import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {


  constructor(private router: Router, private quizService: QuizService) {

  }

  ngOnInit() {

  }

  addUser() {
    this.router.navigate(['user-add']);
  }

  usersList() {
    this.router.navigate(['users-list']);
  }

  addTheme() {
    this.router.navigate(['theme-add']);
  }
  addQuiz() {
    this.router.navigate(['quiz-form']);
  }

  quizzeslist() {
    this.quizService.setQuizzesFromUrl();
    this.router.navigate(['quiz-list']);
  }

  themesList() {
    this.router.navigate(['themes-list']);
  }

  parameters() {

  }

}
