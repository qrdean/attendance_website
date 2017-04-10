/*
This page defines all the modules that need to be linked together.

When adding a module first:

import { NameModule } from './relative/path/to/file.component';

Add it to the @NgModule depending on what it is

node_modules are put in the "import"

Components are put in the "declarations"

Services are put in the "providers"

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Imported app-routing.module, app.component,
                        schedule.component, schedule.service

*/

import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppRouterModule }      from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { ScheduleComponent }    from './schedule/schedule.component';
import { ScheduleService }      from './schedule/schedule.service';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRouterModule
  ],
  providers: [
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
