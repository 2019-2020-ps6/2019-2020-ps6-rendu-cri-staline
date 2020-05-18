import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {RightsService} from '../../../services/rights.service';
import { NavigationService } from 'src/services/navigation.service';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss']
})
export class ThemesListComponent implements OnInit {

  private themesList: Theme[] = [];
  private quizList: Quiz[];
  private enableAdmin: boolean;

  constructor(private router: Router,
              private quizService: QuizService,
              private rightsService: RightsService,
              private navigationService: NavigationService) {

    this.quizService.themes$.subscribe((theme) => this.themesList = theme);
    this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });
    this.navigationService.setTitle('Thèmes');
  }

  ngOnInit(): void {
    if (this.enableAdmin === true) {
      this.navigationService.setPreviousUrl(['workspace']);
    } else {
      this.navigationService.setPreviousUrl(['users-list']);
    }
  }


  deleteTheme(theme: Theme) {
    this.quizService.deleteTheme(theme);
  }

  addTheme() {
    this.router.navigate(['themes-list', 'add']);
  }
}
