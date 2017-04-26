import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { StatsService }       from './stats.service';
@Component({
  selector: 'my-stats',
  templateUrl: './stats.component.html',
  //styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(
    private router: Router,
    private statsService: StatsService
  ) {}

  ngOnInit() {
    //somefuckin'bullshit function
  }
}
