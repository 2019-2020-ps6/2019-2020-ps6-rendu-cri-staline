import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {


  constructor(private router: Router,
              private quizService: QuizService,
              private navigationService: NavigationService,
              private rightsService: RightsService) {
        this.navigationService.setTitle('Gestion du jeu');
        this.navigationService.setPreviousUrl(['home']);

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

  themeslist() {
    this.rightsService.enableAdmin();
    this.quizService.setThemesFromUrl();
    this.navigationService.setTitle('Thèmes');
    this.router.navigate(['themes-list']);
  }


}
