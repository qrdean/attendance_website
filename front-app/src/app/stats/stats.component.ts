/**Author: Devin Madeley
Date Made: 4-11-17
Purpose: Creates student statistics page
Error Type: Need to accept data from backend
*/

import { Component, OnInit }  from '@angular/core';
import { StatService }        from './stats.service';
import {Data }                from './data';

@Component({
  selector: 'my-stats',
  template: `
  <h1>Statistics Page</h1>
  <h2>Hello {{stuName}}</h2>
  <h2>{{courseName}}</h2>
  <div *ngFor="let data of datas" >
  	<h3>Mean: {{data.mean}}</h3>
  	<h3>Days Missed: {{data.missed}}</h3>
  </div>
  `
})
export class StatsComponent implements OnInit  {
stuName = 'Bob';
courseName = 'Java';

datas: Data[];

constructor(private statService: StatService) { }
// get courseName
// get stuName
getData(): void { //changed
  this.statService.getData().then(datas => this.datas = datas);
 }
  ngOnInit(): void {
  	this.getData();
  }

}
