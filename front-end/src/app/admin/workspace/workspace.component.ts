import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {


  constructor(private router: Router, private quizService: QuizService,
              private navigationService: NavigationService) {
        this.navigationService.setTitle('Gestion du jeu');

  }

  ngOnInit() {
  }


  usersList() {
    this.router.navigate(['users-list']);
    this.navigationService.setTitle('Acceuillis');
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
    this.navigationService.setTitle('Thèmes');
  }

  parameters() {

  }

}
