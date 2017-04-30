/*******************************************************************************
* This page calls functions that are used to display the schedule of a Professor |
* Student and used to take attendance
*
* @author         : Quinton Dean
* @date_created:  : 4/7/2017
* @last_modified  : 4/29/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Rx';

import { Schedule }           from './schedule';
import { ScheduleService }    from './schedule.service';
import { User }               from '../login/user';
import { AuthService }        from '../auth.service';
import { SharedService }      from '../shared.service';
import { CrnClass }           from './crn.class';
@Component({
  selector: 'my-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [ './schedule.component.css' ]
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[];
  array = [];
  areWeAttending: boolean = false;
  crn: CrnClass[];
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
    public authService: AuthService,
    private sharedService: SharedService
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
    if(schedules.classDays == 'MWF' && (date.getDay() == 1 || date.getDay() == 3 || date.getDay() == 5 || date.getDay() == 0)) {
      return true;
    } else if(schedules.classDays == 'MW' && (date.getDay() == 1 || date.getDay() == 3 || date.getDay() == 0)) {
      return true;
    } else if(schedules.classDays == 'TR' && (date.getDay() == 2 || date.getDay() == 4 || date.getDay() ==0)) {
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
      if(date.getHours() == this.hh && date.getMinutes() <= 59 ||
         date.getHours() == this.hh-1 && date.getMinutes() >= 0)
      {
        return true;
      } else {
        return false;
      }
    } else if (this.mm == 30) {
      if(date.getHours() == this.hh && date.getMinutes() <= 59 ||
        date.getHours() == this.hh-1 && date.getMinutes() >= 0)
      {
        return true;
      } else {
        return false;
      }
    }
  }

  // This takes User, schedule, crn and everything
  updateRealAttendance(user: string, schedule: Schedule, crn: string): void {
    var date = new Date();
    console.log("Check time returns: " + this.checkTime(schedule, date));
    console.log("Check day returns: " + this.checkDay(schedule, date));
    if(this.checkTime(schedule, date) && this.checkDay(schedule, date)) {
      this.scheduleService.realUpdateAttendance(crn, user).then(resp => {
        this.message = "You have successfully signed in!";
        this.areWeAttending=true;
      })
    }  else {
      this.message = "It is outside the time window to log in! " + date.getHours() + date.getMinutes();
      this.areWeAttending=false;
    }
  }

  // posts a 1 to the back end if the current time is within the parameters.
  updateAttendance(schedule: Schedule): void {
    var date = new Date();
    if(this.checkTime(schedule, date) && this.checkDay(schedule, date)) {
      this.scheduleService.updateAttendance(schedule).then(resp => {
        this.message = "You have successfully signed in!";
        resp
      });
    } else {
      this.message = "It is outside the time window to log in! " + date.getHours() + date.getMinutes();
    }
  }

  getCombinedSchedule(user: User): void {
    this.scheduleService.getScheduleCombine(user).subscribe((resp: any) => {
      console.log("sup");
      console.log(resp);
      var respString = JSON.stringify(resp);
      var respObj = JSON.parse(respString);
      console.log(respObj[0].classInfo.classDays);
      this.array= resp;
      console.log(this.array);
    });
  }

  // test function call to the mock-backend.
  getScheduleTest(): void {
    this.scheduleService.getScheduleTest().then(schedules => {
      this.schedules = schedules });
  }

  logout(): void {
    if(this.authService.isLoggedIn) {
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    } else {
      /* do nothing */
    }
    this.authService.logout();
  }

  // Initializes the page
  ngOnInit(): void {
    //this.getSchedule();
    this.getCombinedSchedule(this.sharedService.getUser());
  }
}
