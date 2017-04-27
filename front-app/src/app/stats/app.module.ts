import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { DataService }   from './data.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //Page won't load here
    InMemoryWebApiModule.forRoot(InMemoryDataService)
    //AppRoutingModule
  ],
  declarations: [
    AppComponent,   
  ],
  providers:[ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }