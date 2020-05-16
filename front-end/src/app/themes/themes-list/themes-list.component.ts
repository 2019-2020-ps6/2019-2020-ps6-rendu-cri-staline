import { Component, OnInit , Input} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
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

  public themesList: Theme[] = [];
  public quizList: Quiz[];
  public enableAdmin: boolean;

  constructor(private router: Router, public themeService: ThemeService, private rightsService: RightsService,
              private navigationService: NavigationService, private quizService: QuizService) {

    this.themeService.themes$.subscribe((theme) => this.themesList = theme);
    console.log(this.themesList);
    this.rightsService.enableAdmin$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
    this.navigationService.setTitle('Thèmes');
    this.navigationService.setPreviousUrl(['workspace']);
  }

  ngOnInit(): void {
    console.log(this.enableAdmin);

  }

  themeSelected(theme: Theme) {
    console.log('themeSelect() themes-list');
  }

  deleteTheme(theme: Theme) {
    console.log('deleting theme...');
    this.themeService.deleteTheme(theme);
  }

  goBack() {
    this.router.navigate(['workspace']);
  }

  addTheme() {
    this.router.navigate(['themes-list', 'add']);
  }

  goBackInGame() {
    this.router.navigate(['users-list']);
  }
}
