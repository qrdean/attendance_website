/*
This page defines the promise functions that communicate with the backend
and return either a valid value or an error that is caught and passed to handleError()

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Added functionality: getSchedule(), handleError()
                        TODO: fix updateAttendance function
*/
import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Schedule }        from './schedule';
import { User }            from '../l0gin/user';
import { Stats }           from '../stats';
import { Greet }           from './greet';
import { CrnClass }        from './crn.class';
@Injectable()
export class ScheduleService {
  private scheduleUrl = 'api/schedules'; // URL to web api
  private headersJSON = new Headers({'Content-Type': 'application/json'});
  private headersUrlEnc = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private classDataUrl = '../backend/classes';
  private statDataUrl = '../backend/stat';
  private realScheduleUrl = 'http://50.24.235.40:8080/courseList';
  private realScheduleUrl2 = 'http://50.24.235.40:8080/courseInfo';
  constructor(private http: Http) { }

  // add user id in params passed.
  realGetSchedule(user: User): Observable<CrnClass[]> {
    var creds = "id=" + user.name;
    return this.http.post(this.realScheduleUrl, creds, {headers: this.headersUrlEnc})
                    .map(response => response.json() as CrnClass[])
                    .catch(this.handleError);
  }

  realGetSchedule2(crn: CrnClass, user: User): Observable<Schedule> {
    var crnString = JSON.stringify(crn);
    var crnObj = JSON.parse(crnString);
    var creds = "crn=" + Number(crnObj.crn) + "&id=" + Number(user.name);
    //console.log(creds);
    return this.http.post(this.realScheduleUrl2, creds, {headers: this.headersUrlEnc})
                    .map(response => response.json() as Schedule)
                    .catch(this.handleError);
  }
/*
  realUpdateAttendance(user:User): Promise<Schedule> {
    return this.http.post(this.scheduleUrl, )
  }
*/

  updateAttendance(schedule: Schedule): Promise<Schedule> {
    return this.http
      .post(this.scheduleUrl, JSON.stringify(schedule), {headers: this.headersJSON})
      .toPromise()
      .then(res => res.json().data as Schedule)
      .catch(this.handleError);
  }

  // add user id in params passed.
  getSchedule(): Promise<Schedule[]> {
    return this.http.get(this.scheduleUrl)
                    .toPromise()
                    .then(response => response.json().data as Schedule[])
                    .catch(this.handleError);
  }

  getClass(name: number): Promise<Schedule> {
    const url = `${this.scheduleUrl}/${name}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Schedule)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
