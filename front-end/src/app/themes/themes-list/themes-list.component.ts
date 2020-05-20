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

  /**
   * Liste des thèmes.
   */
  private themesList: Theme[] = [];

  /**
   * Droit de modification.
   */
  private enableAdmin: boolean;

  constructor(private router: Router,
              private quizService: QuizService,
              private rightsService: RightsService,
              private navigationService: NavigationService) {

    this.quizService.themes$.subscribe((theme) => {
     this.themesList = theme;
    });
    this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });
    this.navigationService.setTitle('Thèmes');
  }

  ngOnInit(): void {
    this.quizService.setThemesFromUrl();
    if (this.enableAdmin === true) {
      this.navigationService.setPreviousUrl(['workspace']);
    } else {
      this.navigationService.setPreviousUrl(['users-list']);
    }
  }

  /**
   * Supprime un theme.
   * @param theme theme que l'on veut supprimer
   */
  deleteTheme(theme: Theme) {
    this.quizService.deleteTheme(theme);
  }

  /**
   * Redirige vers la page de creation de theme.
   */
  addTheme() {
    this.router.navigate(['themes-list', 'add']);
  }
}
