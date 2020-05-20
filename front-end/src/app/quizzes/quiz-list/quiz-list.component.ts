import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { RightsService } from 'src/services/rights.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  private quizList: Quiz[];

  private enableAdmin: boolean;

  private themeId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public quizService: QuizService,
              private rightsService: RightsService,
              private navigationService: NavigationService) {
    this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizList = quizzes;

        if (this.quizList !== undefined && this.enableAdmin === false) {
          // this.deleteBadQuizzes();
        }
        console.log(this.quizList);
    });
    this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });


    this.quizService.themeSelected$.subscribe((theme) => {
      console.log(theme);
      this.navigationService.setTitle('Thème - ' + theme.themeName);
    });
    this.navigationService.setPreviousUrl(['themes-list']);

  }

  ngOnInit() {
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setQuizzesFromUrl(this.themeId);
    this.quizService.setSelectedTheme(this.themeId);
  }

  /**
   * Redirige vers la page de modification du theme dont sont issus les quiz
   */
  editTheme() {
    this.router.navigate(['themes-list', this.themeId, 'edit']);
  }

  /**
   * Redirige vers la page de creation de quiz
   */
  addQuiz() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', 'add']);

  }

  /**
   * "Cache" les quiz n'ayant pas de questions ou ayant des questions sans reponses correctes (dans l'espace jeu)
   */
  deleteBadQuizzes() {
      const badQuizzes = [];
      for ( let i = 0; i < this.quizList.length; i++) {
        if (this.quizList[i].questions.length === 0) {
          badQuizzes.push(i);
        } else {
          this.quizList[i].questions.forEach((question) => {
              let haveOneAnswerTrue = false;
              question.answers.forEach((answer) => {
                  if (answer.isCorrect) {
                    haveOneAnswerTrue = true;
                  }
              });
              if (haveOneAnswerTrue === false) { badQuizzes.push(i); }
            });
        }
      }

      badQuizzes.forEach((badQuiz) => {this.quizList.splice(badQuiz, 1); });

  }
}
