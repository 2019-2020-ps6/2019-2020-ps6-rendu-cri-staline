import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';

import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';

import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './admin/workspace/workspace.component';
import { ThemeAddComponent } from './themes/theme-add/theme-add.component';
import { QuestionsListComponent} from './quizzes/questions-list/questions-list.component';
import { QuestionAddComponent } from './quizzes/question-add/question-add.component';

import { AnswersListComponent } from './quizzes/answers-list/answers-list.component';

import { from } from 'rxjs';
const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'quiz-list/:id', component: QuestioningComponent},
    {path: 'workspace', component: WorkspaceComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user-add', component: UserAddComponent},
    {path: 'users-list/edit/:id', component: UserEditComponent},
    {path: 'users-list', component: UsersListComponent},
    {path: 'users-list/:id', component: UserDetailsComponent},
    {path: 'theme-add', component: ThemeAddComponent},
    {path: 'quiz-form', component: QuizFormComponent},
    {path: 'quiz-list/:quizId/questions-list', component: QuestionsListComponent},
    {path: 'quiz-list/:quizId/questions-list/question-add', component: QuestionAddComponent},
    {path: 'quiz-list/:quizId/questions-list/:questionId/answers-list', component: AnswersListComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
