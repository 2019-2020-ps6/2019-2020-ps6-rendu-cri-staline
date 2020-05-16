import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  public questionsList: Question[] = [];
  public quiz: Quiz;
  private id: string;
  private previousUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService,
              private navigationService: NavigationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionsList = quiz.questions;
      navigationService.setTitle('Quiz - ' + quiz.name);
      console.log(this.quiz);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(this.id);
    this.previousUrl = 'quiz-list' + '/' + this.id + '/questions-list';
  }

  selectAddQuestion() {
    this.router.navigate(['quiz-list', this.quiz.id.toString(), 'questions-list', 'question-add']);
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.id, question);
  }

  goBack() {
    this.router.navigate(['quiz-list']);
  }

  editQuestion() {
    this.router.navigate(['quiz-list', 'edit', this.quiz.id]);

  }

}
