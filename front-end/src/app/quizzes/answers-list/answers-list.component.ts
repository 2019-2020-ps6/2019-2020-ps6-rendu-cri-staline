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
  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService,
              private navigationService: NavigationService) {
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answersList = answers;
      console.log(this.answersList);
    });
    this.quizService.questionSelected$.subscribe((question) => {
      this.question = question;
      this.navigationService.setTitle('Question - ' + this.question.label);
    });
  }


  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedAnswers(this.quizId, this.questionId);
    this.quizService.setSelectedQuestion(this.quizId, this.questionId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list']);
  }

  addAnswer() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list', 'add']);
  }

  deleteAnswer(answer: Answer) {
    this.quizService.deleteAnswer(this.quizId, this.questionId, answer);
  }

  goBack() {
    this.router.navigate(['quiz-list', this.quizId, 'questions-list']);
  }
  editQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quizId, 'questions-list', this.questionId, 'edit']);
  }

}
