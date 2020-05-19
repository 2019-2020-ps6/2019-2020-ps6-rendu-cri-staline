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

  private questionsList: Question[] = [];
  private quiz: Quiz;
  private quizId: string;
  private themeId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private quizService: QuizService,
              private navigationService: NavigationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionsList = quiz.questions;
      navigationService.setTitle('Quiz - ' + quiz.name);
      console.log(this.quiz);
    });
  }

  ngOnInit(): void {
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz( this.themeId, this.quizId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list']);
  }

  addQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quiz.id.toString(), 'questions-list', 'add']);
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion( this.themeId, question.id, question);
  }

  editQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list',  this.quiz.id, 'edit']);

  }



}
