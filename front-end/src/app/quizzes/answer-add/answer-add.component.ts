import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../../../models/question.model';
import { NavigationService } from 'src/services/navigation.service';
import { RightsService } from 'src/services/rights.service';

@Component({
  selector: 'app-answer-add',
  templateUrl: 'answer-add.component.html',
  styleUrls: ['answer-add.component.scss']
})
export class AnswerAddComponent implements OnInit {

  /**
   * Formulaire d'une réponse.
   */
  private answerForm: FormGroup;

  /**
   * Identifiant de la question.
   */
  private questionId: string;

  /**
   * Identifiant du quiz.
   */
  private quizId: string;

  /**
   * Identifiant du theme.
   */
  private themeId: string;

  /**
   * Message d'erreur.
   */
  private err = '';

  /**
   * Affichage d'un message d'erreur.
   */
  private alert = false;

  /**
   * Liste de réponses.
   */
  private answersList: Answer[] = [];

  constructor(private formBuilder: FormBuilder,
              private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private rightsService: RightsService) {
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: ['']
    });
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answersList = answers;
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this .themeId = this.route.snapshot.paramMap.get('themeId');
    this.quizService.setSelectedQuestion(this.themeId, this.quizId, this.questionId);
    this.quizService.setSelectedAnswers(this.themeId, this.quizId, this.questionId);
    this.navigationService.setPreviousUrl(['themes-list', this.themeId, 'quiz-list',
     this.quizId, 'questions-list', this.questionId, 'answers-list']);

  }

  /**
   * Ajout d'une reponse.
   * Redirige vers la liste des réponses.
   */
  addAnswer() {
    let answerToAdd: Answer = this.answerForm.getRawValue() as Answer;
    answerToAdd = {type: 'text', ...answerToAdd};
    if (this.checkForm) {
      this.quizService.addAnswer(this.themeId, this.quizId, this.questionId, answerToAdd);
      this.rightsService.enableAdmin();
      this.navigationService.previous();

    }
  }

  /**
   * Vérifie qu'il y ait au moins une bonne réponse parmi les réponses d'une question
   * @return True s'il y a au moins une bonne reponse
   */
  checkForm() {
   let atLeastOneGoodAnswer = false;
   this.answersList.forEach(answer => {
     if (answer.isCorrect) {
      atLeastOneGoodAnswer = true;
     }
   });
   if (atLeastOneGoodAnswer) {
    this.err = 'Au moins une bonne réponse pour la question.';
   }

   this.alert = atLeastOneGoodAnswer;
   return atLeastOneGoodAnswer;
  }

  /**
   * Annule la creation d'une reponse et renvoie à la liste des réponses.
   */
  cancel() {
   this.navigationService.previous();
   this.rightsService.enableAdmin();
  }

}
