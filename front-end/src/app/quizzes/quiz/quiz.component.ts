import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router, ActivatedRoute } from '@angular/router';
import { RefereeService } from 'src/services/referee.service';
import { RightsService } from 'src/services/rights.service';
import { QuizService } from 'src/services/quiz.service';
import { NavigationService } from 'src/services/navigation.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  private enableAdmin: boolean;

  private themeId: string;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  questionsQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rightsService: RightsService,
              private quizService: QuizService,
              private navigationService: NavigationService) {
      this.rightsService.enableAdmin$.subscribe(admin => {this.enableAdmin = admin; });
  }


  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'quiz-list') {
      this.router.navigate(['home']);
    }
    this.themeId = this.route.snapshot.paramMap.get('themeId');
  }

  play() {
    this.router.navigate(['quiz', this.quiz.id], {fragment: 'question'});
    this.quizService.setSelectedQuiz(  this.themeId, this.quiz.id);
    this.navigationService.setTitle('Quiz ' + this.quiz.name);
  }

  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuiz( this.themeId, this.quiz);
      this.router.navigate(['themes-list', this.themeId, 'quiz-list']);
    }
  }

  questions() {
    this.router.navigate(['themes-list', this.themeId, 'quiz-list', this.quiz.id, 'questions-list']);
    this.navigationService.setTitle('Quiz ' + this.quiz.name);
    this.rightsService.enableAdmin();
  }


}
