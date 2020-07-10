import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { WinComponent } from './win/win.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { PlayersListComponent } from './players-list/players-list.component';
const routes: Routes = [
    {
        path: '',
        component: StartComponent
    },
    {
        path: 'quiz',
        component: QuizGameComponent
    },
    {
        path: 'win',
        component: WinComponent
    },
    {
        path: 'add-question',
        component: AddQuestionComponent
    },
    {
        path: 'persons',
        component: PlayersListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
