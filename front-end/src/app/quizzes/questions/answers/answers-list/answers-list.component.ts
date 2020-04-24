import {Component, OnInit} from '@angular/core';
import {Answer, Question} from '../../../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../../services/quiz.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  public answersList: Answer[] = [];
  public question: Question;
  private id: string;
  private quizId: string;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.quizService.questionsSelected$.subscribe((question) => {
      this.question = question;
      this.answersList = question.answers;
      console.log(this.question);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('questionId');
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuestion(this.quizId, this.id);
  }

}
