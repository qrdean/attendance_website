/*
This file defines the "routes" of the web application and which components each
path will be linked together.

Define routes in this module

Quinton Dean  4/7/2017  Created file
Quinton Dean  4/7/2017  Added path schedule and set /schedule as default path
Quinton Dean  4/10/2017 Added paths for future modules

*/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';

import { ScheduleComponent }    from './schedule/schedule.component';
import { LoginComponent }       from './l0gin/login.component';
import { AuthGuard }            from './auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'login', component: LoginComponent },  // switch to LoginComponent once login is complete
  { path: 'stats/:crn', component: ScheduleComponent }   // switch to StatsComponent once login is complete
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRouterModule {}
