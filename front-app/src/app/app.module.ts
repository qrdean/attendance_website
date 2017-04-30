/*******************************************************************************
*
* This page defines all the modules so they can be linked together.
* node_modules are put in the "import"
* Components are put in the "declarations"
* Services are put in the "providers"
*
* @author         : Quinton Dean
* @date_created:  : 4/7/2017
* @last_modified  : 4/27/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppRouterModule }      from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { AuthService }          from './auth.service';
import { ScheduleComponent }    from './schedule/schedule.component';
import { ScheduleService }      from './schedule/schedule.service';
import { LoginComponent }       from './login/login.component';
import { StatsComponent }       from './stats/stats.component';
import { StatService }          from './stats/stats.service';

import { SharedService }         from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    LoginComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    AppRouterModule
  ],
  providers: [
    ScheduleService,
    AuthService,
    StatService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
