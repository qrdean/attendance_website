/**Author: Devin Madeley
Date Made: 4-11-17
Purpose: Creates student statistics page
Error Type: Need to accept data from backend
*/

import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { StatService }            from './stats.service';
import { SharedService }          from '../shared.service';
import { ScheduleService }        from '../schedule/schedule.service';
import { Schedule }               from '../schedule/schedule';
import { Data }                   from './data';

@Component({
  selector: 'my-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit  {
  stuName = 'Bob';
  courseName = 'Java';
  data: Data = {
    mean: 0.6,
    missed: 5
  }
  datas: Data[];
  schedule: Schedule;

  constructor(private statService: StatService,
              private sharedService: SharedService,
              private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private location: Location
  ) { }
  // get courseName
  // get stuName
  getData(): void { //changed
    this.statService.getData().then(datas => this.datas = datas);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.scheduleService.getClass(+params['name']))
        .subscribe(className => this.schedule = className);
  	//this.getData();
  }

}
