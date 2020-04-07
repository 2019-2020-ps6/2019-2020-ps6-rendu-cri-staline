import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { WorkspaceComponent } from './admin/workspace/workspace.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'quiz-list/:id', component: QuestioningComponent},
    {path: 'workspace', component: WorkspaceComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user-add', component: UserAddComponent},
    {path: 'users-list', component: UsersListComponent},
    {path: 'users-list/:id', component: UserDetailsComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
