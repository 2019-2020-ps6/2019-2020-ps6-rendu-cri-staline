import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';

import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';

import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './admin/workspace/workspace.component';
import { ThemeAddComponent } from './themes/theme-add/theme-add.component';

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
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}