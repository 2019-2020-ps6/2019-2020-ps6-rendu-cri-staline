import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  public questionForm: FormGroup;
  public question: Question;
  public id: string;
  public questionId: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.quizService.questionsSelected$.subscribe((question) => {
      this.question = question;
      console.log(this.question);
    });
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('quizId');
    this.questionId = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(this.id);
    this.quizService.setSelectedQuestion(this.id, this.questionId);
  }

  updateQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    if (questionToAdd.label === '') {
      questionToAdd.label = this.question.label;
    }
    this.quizService.updateQuestion(this.id, this.question.id, questionToAdd);
    this.router.navigate(['quiz-list', this.id, 'questions-list']);
  }

  cancel() {
    this.router.navigate(['quiz-list', this.id, 'questions-list']);
  }

}
