import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { RightsService } from 'src/services/rights.service';
import { NavigationService } from 'src/services/navigation.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              public quizService: QuizService, private rightsService: RightsService,
              private navigationService: NavigationService, private themeService: ThemeService) {
    this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizList = quizzes;
        console.log(this.quizList);
    });
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;


    this.themeService.themeSelected$.subscribe((theme) => {
      console.log(theme);
      this.navigationService.setTitle('Thème - ' + theme.themeName);
    });
    this.navigationService.setPreviousUrl(['themes-list']);

  }

  private quizList: Quiz[];

  private enableAdmin: boolean;

  private themeId: string;



  ngOnInit() {
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setQuizzesByTheme(this.themeId);
    if (this.themeId !== undefined) {
      this.themeService.setSelectedTheme(this.themeId);
    }
  }
  goBack() {
    this.router.navigate(['themes-list']);
  }
  goBackInGame() {
    this.router.navigate(['themes-list', this.themeId]);
  }
  editTheme() {
    this.router.navigate(['themes-list', this.themeId, 'edit']);
  }
  addQuiz() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', 'add']);

  }
}
