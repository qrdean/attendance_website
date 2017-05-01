/**Author: Devin Madeley
Date Made: 4-11-17
Last Modified: 4-24-17
Related to Statistics Page
Purpose: Creates student statistics page; main component
*/
//Imports allow data to be referencedssss
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { StatService }            from './stats.service';
import { SharedService }      from '../shared.service';
import { Data }                   from './data';

@Component({
  selector: 'my-stats',
  templateUrl: './stats.component.html',
  styleUrls: [ './stats.component.css' ]
})
export class StatComponent implements OnInit  {
  //Static data
  data: Data;

  //The constructor simultaneously defines a private DataService
  //property and identifies it as a DataService injection site.
  constructor(private statService: StatService,
              private route: ActivatedRoute,
              private location: Location,
              private sharedService: SharedService
            ) { }

 //Allows angular to call getData()
  ngOnInit(): void {
  	this.route.params
  		.switchMap((params:Params) => this.statService.getData(+params['crn']))
  		.subscribe(data => {
        console.log(data);
        this.data = data;
        console.log(this.data);
      });
  }

  goBack(): void  {
	   this.location.back();
	}
}
