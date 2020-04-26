import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import {LineChartComponent} from 'src/app/charts/line-chart/line-chart.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';

import { AnswerComponent } from './quizzes/answer/answer.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizEditComponent } from './quizzes/quiz-edit/quiz-edit.component';

import {UserComponent} from './users/user/user.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';
import {ResultComponent} from './users/result/result.component';

import { WorkspaceComponent } from './admin/workspace/workspace.component';
import { HomeComponent } from './home/home.component';

import { ThemeAddComponent } from './themes/theme-add/theme-add.component';
import {ThemeComponent} from './themes/theme/theme.component';
import { ThemeEditComponent } from './themes/theme-edit/theme-edit.component';
import {ThemesListComponent} from './themes/themes-list/themes-list.component';
import {ThemeDetailsComponent} from './themes/theme-details/theme-details.component';

import { QuestionComponent } from './quizzes/question/question.component';
import { QuestionsListComponent } from './quizzes/questions-list/questions-list.component';
import { QuestionAddComponent } from './quizzes/question-add/question-add.component';

import {AnswersListComponent} from './quizzes/answers-list/answers-list.component';
import { AnswerAddComponent} from './quizzes/answer-add/answer-add.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    QuestioningComponent,
    UserAddComponent,
    AnswerComponent,
    WorkspaceComponent,
    HomeComponent,
    UsersListComponent,
    UserComponent,
    UserDetailsComponent,
    UserEditComponent,
    ThemeAddComponent,
    ThemeComponent,
    ThemeEditComponent,
    ThemesListComponent,
    ThemeDetailsComponent,
    ResultComponent,
    QuestionComponent,
    QuestionsListComponent,
    QuestionAddComponent,
    AnswersListComponent,
    AnswerComponent,
    LineChartComponent,
    AnswerAddComponent,
    QuizEditComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
