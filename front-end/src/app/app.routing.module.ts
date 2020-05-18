import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { QuizAddComponent} from './quizzes/quiz-add/quiz-add.component';
import {QuizEditComponent} from './quizzes/quiz-edit/quiz-edit.component';

import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';

import { ThemeAddComponent } from './themes/theme-add/theme-add.component';
import { ThemeEditComponent } from './themes/theme-edit/theme-edit.component';
import {ThemesListComponent} from './themes/themes-list/themes-list.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';


import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './admin/workspace/workspace.component';
import { QuestionsListComponent} from './quizzes/questions-list/questions-list.component';
import { QuestionAddComponent } from './quizzes/question-add/question-add.component';

import { AnswersListComponent } from './quizzes/answers-list/answers-list.component';
import { AnswerAddComponent } from './quizzes/answer-add/answer-add.component';
import { QuestionEditComponent} from './quizzes/question-edit/question-edit.component';
import {AnswerEditComponent} from './quizzes/answer-edit/answer-edit.component';


import { from } from 'rxjs';
import { ResultDetailsComponent } from './users/result-details/result-details.component';
const routes: Routes = [
    {path: 'workspace', component: WorkspaceComponent},
    {path: 'home', component: HomeComponent},
    {path: 'quiz/:quizId', component: QuestioningComponent},
    {path: 'users-list/add', component: UserAddComponent},
    {path: 'users-list/:userId/edit', component: UserEditComponent},
    {path: 'users-list', component: UsersListComponent},
    {path: 'users-list/:userId', component: UserDetailsComponent},
    {path: 'users-list/:userId/results/:resultId', component: ResultDetailsComponent},
    {path: 'themes-list', component: ThemesListComponent},
    {path: 'themes-list/:themeId/quiz-list', component: QuizListComponent},
    {path: 'themes-list/add', component: ThemeAddComponent},
    {path: 'themes-list/:themeId/edit', component: ThemeEditComponent},
    {path: 'themes-list/:themeId/quiz-list/add', component: QuizAddComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/edit', component: QuizEditComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list', component: QuestionsListComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list/add', component: QuestionAddComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list/:questionId/edit', component: QuestionEditComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list/:questionId/answers-list', component: AnswersListComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list/:questionId/answers-list/add', component: AnswerAddComponent},
    {path: 'themes-list/:themeId/quiz-list/:quizId/questions-list/:questionId/answers-list/:answerId/edit', component: AnswerEditComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled'
      })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
