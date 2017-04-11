/*
This page calls functions that are used to display the schedule of a Professor |
Student and used to take attendance

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Added functionality: getSchedule(), ngOnInit()
Quinton Dean  4/10/2017 Added functionality: parseTime(), checkDay(), checkTime(),
                        TODO: fix updateAttendance()
*/

import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Schedule }           from './schedule';
import { ScheduleService }    from './schedule.service';
@Component({
  selector: 'my-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [ './schedule.component.css' ]
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[];
  hh: number;
  mm: number;
  message: string;
  date : Date = new Date();

  constructor(
    private router: Router,
    private scheduleService: ScheduleService
  ) {}

  // function call to the backend.
  getSchedule(): void {
    this.scheduleService.getSchedule().then(schedules => this.schedules = schedules);
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
  checkDay(schedules: Schedule): boolean {
    if(schedules.classDay == 'MWF' && (this.date.getDay() == 1 || this.date.getDay() == 3 || this.date.getDay() == 5)) {
      return true;
    } else if(schedules.classDay == 'TR' && (this.date.getDay() == 2 || this.date.getDay() == 4)) {
      return true;
    } else {
      return false;
    }
  }

  // Returns true if the time is the 5 minutes before && 5 minutes after
  checkTime(schedules: Schedule): boolean {
    this.parseTime(schedules);
    var currentTime = this.date.getHours()
    if(this.mm == 0) {
      if(this.date.getHours() == this.hh && this.date.getMinutes() <= 5 ||
         this.date.getHours() == this.hh-1 && this.date.getMinutes() >= 55)
      {
        return true;
      } else {
        return false;
      }
    } else if (this.mm == 30) {
      if(this.date.getHours() == this.hh && this.date.getMinutes() <= 45 ||
        this.date.getHours() == this.hh-1 && this.date.getMinutes() >= 25)
      {
        return true;
      } else {
        return false;
      }
    }
  }

  // posts a 1 to the back end if the current time is within the parameters.
  updateAttendance(schedule: Schedule): void {
    if(this.checkTime(schedule) && this.checkDay(schedule)) {
      this.scheduleService.updateAttendance(schedule)
          .then(schedule => schedule.attended = 1)
      this.message = "You have successfully signed in!";
    } else {
      this.message = "It is outside the time window to log in!";
    }
  }

  // Initializes the page
  ngOnInit(): void {
    this.getSchedule();
  }
}
