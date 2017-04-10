/*
This file defines the "routes" of the web application and which components each
path will be linked together.

Define routes in this module

Quinton Dean  4/7/2017  Created file
Quinton Dean  4/7/2017  Added path schedule and set /schedule as default path

*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';

import { ScheduleComponent }    from './schedule/schedule.component';
const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRouterModule {}