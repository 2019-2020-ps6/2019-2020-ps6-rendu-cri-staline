import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuestioningComponent } from './quizzes/questioning/questioning.component';
import { SelectActionComponent } from './admin/select-action/select-action.component';
import { UserAddComponent } from './users/user-add/user-add.component';
const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'quiz-list/:id', component: QuestioningComponent},
    {path: 'select-action', component: SelectActionComponent},
    {path: 'user-add', component: UserAddComponent},
    { path: '', redirectTo: 'select-action', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
