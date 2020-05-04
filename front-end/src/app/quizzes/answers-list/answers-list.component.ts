import {Component, OnInit} from '@angular/core';
import {Answer, Question} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  public answersList: Answer[] = [];
  private questionId: string;
  private quizId: string;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.quizService.answersSelected$.subscribe((answers) => {
      this.answersList = answers;
      console.log(this.answersList);
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedAnswers(this.quizId, this.questionId);
  }

  addAnswer() {
    this.router.navigate(['quiz-list', this.quizId, 'questions-list', this.questionId, 'answers-list', 'answer-add']);
  }

  deleteAnswer(answer: Answer) {
    this.quizService.deleteAnswer(this.quizId, this.questionId, answer);
  }

  goBack() {
    this.router.navigate(['quiz-list', this.quizId, 'questions-list']);
  }

}
