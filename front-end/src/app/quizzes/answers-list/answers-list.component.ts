import {Component, OnInit} from '@angular/core';
import {Answer, Question} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  private answersList: Answer[] = [];
  private questionId: string;
  private quizId: string;
  private themeId: string;
  private question: Question;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private quizService: QuizService,
              private navigationService: NavigationService) {
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answersList = answers;
      console.log(this.answersList);
    });
    this.quizService.questionSelected$.subscribe((question) => {
      this.question = question;
      console.log(this.question);
      this.navigationService.setTitle('Question - ' + this.question.label);
    });
  }


  ngOnInit() {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedAnswers(this.themeId , this.quizId, this.questionId);
    this.quizService.setSelectedQuestion(this.themeId , this.quizId, this.questionId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list']);
  }

  /**
   * Redirige vers la page de creation d'une reponse
   */
  addAnswer() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list', 'add']);
  }

  /**
   * Redirige vers la page de modification de la question dont sont issues les reponses
   */
  editQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list', this.questionId, 'edit']);
  }

}
