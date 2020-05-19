import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import { Quiz } from '../../../models/quiz.model';
import {Router } from '@angular/router';
import { RightsService } from 'src/services/rights.service';
import { RefereeService } from '../../../services/referee.service';
import { QuizService } from 'src/services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  private imageUrl  = '';

  private enableAdmin: boolean;
  @Input()
  theme: Theme;

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();



  constructor(private router: Router,
              private rightsService: RightsService,
              private quizService: QuizService,
              private refereeService: RefereeService,
              private navigationService: NavigationService) {
        this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });
  }

  ngOnInit() {
    this.imageUrl = this.quizService.themeImageUrl + '/' + this.theme.themeImage;
  }

  delete() {
    if (window.confirm('Etes-vous sur de vouloir supprimer ce theme ?')) {
      this.deleteTheme.emit(this.theme);
      this.router.navigate(['themes-list']);
    } else {
      this.router.navigate(['themes-list']);
    }
  }

  quizzes() {
    this.router.navigate(['themes-list', this.theme.id, 'quiz-list']);
    this.quizService.setSelectedTheme(this.theme.id);
  }
}
