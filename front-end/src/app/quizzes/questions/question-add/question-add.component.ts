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
  public questionsList: Question[];
  public quiz: Quiz;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.questionsList = quiz.questions;
    });
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  addQuestion() {
    const questionToAdd: Question = this.questionForm.getRawValue() as Question;
    this.quizService.addQuestion(questionToAdd);
    this.router.navigate(['../', 'quiz-list', '/:id', 'questions-list']);
  }

}
