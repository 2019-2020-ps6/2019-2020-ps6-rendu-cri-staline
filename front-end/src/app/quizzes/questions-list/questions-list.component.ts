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

  /**
   * Listes des questions.
   */
  private questionsList: Question[] = [];

  /**
   * Quiz.
   */
  private quiz: Quiz;

  /**
   * Identifiant du quiz.
   */
  private quizId: string;

  /**
   * Identifiant du theme.
   */
  private themeId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private quizService: QuizService,
              private navigationService: NavigationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionsList = quiz.questions;
      navigationService.setTitle('Quiz - ' + quiz.name);
    });
  }

  ngOnInit(): void {
    this.themeId =  this.route.snapshot.paramMap.get('themeId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz( this.themeId, this.quizId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list']);
  }

  /**
   * Redirige vers la page de creation de question.
   */
  addQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quiz.id.toString(), 'questions-list', 'add']);
  }

  /**
   * Supprime une question.
   * @param question Question que l'on veut supprimer
   */
  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion( this.themeId, question.id, question);
  }

  /**
   * Redirige vers la page de modification du quiz.
   */
  editQuestion() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list',  this.quiz.id, 'edit']);

  }



}
