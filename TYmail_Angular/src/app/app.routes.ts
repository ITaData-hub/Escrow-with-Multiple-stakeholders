import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './screens/room/room.component';
import { ParticipateComponent } from './screens/participate/participate.component';
import { WinComponent } from './screens/win/win.component';
import { LoseComponent } from './screens/lose/lose.component';

export const routes: Routes = [
    {path:'', component: RoomComponent},
    {path:'participate', component: ParticipateComponent},
    {path:'win', component: WinComponent},
    {path:'lose', component: LoseComponent}
];


NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})