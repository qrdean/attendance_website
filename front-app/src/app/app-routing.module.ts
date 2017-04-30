/*******************************************************************************
*
* This file defines the "routes" of the web application and which components
* the path will be linked to.
*
* @author         : Quinton Dean
* @date_created:  : 4/7/2017
* @last_modified  : 4/27/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { AuthGuard }            from './auth-guard.service';

import { ScheduleComponent }    from './schedule/schedule.component';
import { LoginComponent }       from './login/login.component';
import { StatsComponent }       from './stats/stats.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'login', component: LoginComponent },  // switch to LoginComponent once login is complete
  { path: 'stats/:crn', component: StatsComponent }   // switch to StatsComponent once login is complete
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRouterModule {}
