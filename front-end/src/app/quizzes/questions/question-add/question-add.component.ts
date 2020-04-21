import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../../../models/quiz.model';
import {Question} from '../../../../models/question.model';

@Component({
  selector: 'app-question-add',
  templateUrl: 'question-add.component.html',
  styleUrls: ['question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  public questionForm: FormGroup;
  public quiz: Quiz;
  public id: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(this.id);
  }

  addQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    this.quizService.addQuestion(this.id, questionToAdd);
    this.router.navigate(['quiz-list', this.id, 'questions-list']);
  }

}
