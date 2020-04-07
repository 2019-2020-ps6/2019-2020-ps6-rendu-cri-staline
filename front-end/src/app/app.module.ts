import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { AnswerComponent } from './quizzes/answer/answer.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { AdminWorkspaceComponent } from './admin/select-action/admin-workspace.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserComponent} from './users/user/user.component';
import { HomeComponent } from './home/home.component';
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
    AdminWorkspaceComponent,
    HomeComponent,
    UsersListComponent,
    UserComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
