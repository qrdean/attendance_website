/*
This is the "head" of the component webpage. It will be the home page of the
Student | Professor. The top link in <a></a> brackets will navigate around the site

Quinton Dean  4/7/2017  Created
Quinton Dean  4/10/2017 Included the Date() function.
        Created conversion from int to string for day of the week & month
        Created clock that counts the time in HH:MM:SS AM|PM
*/
import { Component, OnInit } from '@angular/core';
import { Observable }         from 'rxjs/Rx';
//import { Date }      from './date';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date : Date = new Date();
  weekday: any[];
  month: any[];
  clock = Observable.interval(1000).map(()=>new Date());
  constructor() {
    this.weekday=[
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    this.month=[
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  }
}
