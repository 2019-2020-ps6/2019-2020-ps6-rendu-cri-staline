import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-question-add',
  templateUrl: 'question-add.component.html',
  styleUrls: ['question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {

  /**
   * Formulaire question.
   */
  private questionForm: FormGroup;

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

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private route: ActivatedRoute,
              private navigationService: NavigationService) {
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    const themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuiz(this.themeId, this.quizId);
    this.navigationService.setPreviousUrl(['themes-list', themeId, 'quiz-list', this.quizId, 'questions-list']);
  }

  /**
   * Ajout de la question et renvoie a la liste des questions.
   */
  addQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    this.quizService.addQuestion(this.themeId, this.quizId, questionToAdd);
    this.navigationService.previous();
  }

  /**
   * Annule la creation de la question et renvoie a la liste des questions.
   */
  cancel() {
    this.navigationService.previous();
  }

}
