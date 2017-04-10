/*
This page calls functions that are used to display the schedule of a Professor |
Student and used to take attendance

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Functions added: getSchedule(), ngOnInit
*/

import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Schedule }           from './schedule';
import { ScheduleService }    from './schedule.service';
@Component({
  selector: 'my-schedule',
  templateUrl: './schedule.component.html',
  //styleUrls: [ './schedule.component.css' ]
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[];

  constructor(
    private router: Router,
    private scheduleService: ScheduleService
  ) {}

  getSchedule(): void {
    this.scheduleService.getSchedule().then(schedules => this.schedules = schedules);
  }

  ngOnInit(): void {
    this.getSchedule();
  }
}
