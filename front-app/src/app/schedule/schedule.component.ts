/*
This page calls functions that are used to display the schedule of a Professor |
Student and used to take attendance

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Added functionality: getSchedule(), ngOnInit()
Quinton Dean  4/10/2017 Added functionality: parseTime(), checkDay(), checkTime(),
Quinton Dean  4/14/2017 Fixed updateAttendance to initialize date var properly
*/

import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Rx';

import { Schedule }           from './schedule';
import { ScheduleService }    from './schedule.service';
import { Greet }              from './greet';
import { User }               from '../login/user';
import { LoginButton }        from '../l0gin/login.button';
import { AuthService }        from '../auth.service';
@Component({
  selector: 'my-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [ './schedule.component.css' ]
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[];
  greeting: Greet;
  hh: number;
  mm: number;
  message: string;
  user: User;
  date : Date = new Date();
  weekday: any[];
  month: any[];
  clock = Observable.interval(1000).map(()=>new Date());

  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    public authService: AuthService
  ) {
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

  // parses out the string to the time to do checks and calculations on.
  parseTime(schedules: Schedule): void {
    var timeString = schedules.classTime;
    var hh = timeString[0] + timeString[1];
    var mm = timeString[3] + timeString[4];
    this.hh = parseInt(hh);
    this.mm = parseInt(mm);
  }

  // Returns true if the day is the same as the day.
  checkDay(schedules: Schedule, date: Date): boolean {
    if(schedules.classDay == 'MWF' && (date.getDay() == 1 || date.getDay() == 3 || date.getDay() == 5)) {
      return true;
    } else if(schedules.classDay == 'MW' && (date.getDay() == 1 || date.getDay() == 3)) {
      return true;
    } else if(schedules.classDay == 'TR' && (date.getDay() == 2 || date.getDay() == 4)) {
      return true;
    } else {
      return false;
    }
  }

  // Returns true if the time is the 5 minutes before && 5 minutes after
  checkTime(schedules: Schedule, date: Date): boolean {
    this.parseTime(schedules);
    var currentTime = date.getHours()
    if(this.mm == 0) {
      if(date.getHours() == this.hh && date.getMinutes() <= 5 ||
         date.getHours() == this.hh-1 && date.getMinutes() >= 55)
      {
        return true;
      } else {
        return false;
      }
    } else if (this.mm == 30) {
      if(date.getHours() == this.hh && date.getMinutes() <= 45 ||
        date.getHours() == this.hh-1 && date.getMinutes() >= 25)
      {
        return true;
      } else {
        return false;
      }
    }
  }

  // posts a 1 to the back end if the current time is within the parameters.
  updateAttendance(schedule: Schedule): void {
    var date = new Date();
    if(this.checkTime(schedule, date) && this.checkDay(schedule, date)) {
      this.scheduleService.updateAttendance(schedule)
          .then(schedule => schedule.attended = 1)
      this.message = "You have successfully signed in!";
    } else {
      this.message = "It is outside the time window to log in! " + date.getHours() + date.getMinutes();
    }
  }

  // function call to the backend.
  getSchedule(): void {
    this.scheduleService.getSchedule().then(schedules => this.schedules = schedules);
  }

  logout() {
    if(this.authService.isLoggedIn) {
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
      this.message = 'Redirected';
      this.router.navigate([redirect]);
    } else {
      this.message = 'failed'
    }
    this.authService.logout();
  }
  // Initializes the page
  ngOnInit(): void {
    this.getSchedule();
  }
}
