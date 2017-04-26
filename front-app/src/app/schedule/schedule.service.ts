/*
This page defines the promise functions that communicate with the backend
and return either a valid value or an error that is caught and passed to handleError()

Quinton Dean  4/7/2017  Created
Quinton Dean  4/7/2017  Added functionality: getSchedule(), handleError()
                        TODO: fix updateAttendance function
*/
import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Schedule }        from './schedule';
import { User }            from '../login/user';
import { Stats }            from '../stats';
import { Greet }           from './greet';
@Injectable()
export class ScheduleService {
  private scheduleUrl = 'api/schedules'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private classDataUrl = '../backend/classes';
  private statDataUrl = '../backend/stat';
  //private scheduleUrl = 'http://50.24.235.40:8080/schedules';
  constructor(private http: Http) { }

  // add user id in params passed.
  realGetSchedule(user: User): Promise<Schedule[]> {
    return this.http.post(this.scheduleUrl, {id:user.id}, {headers: this.headers})
                    .toPromise()
                    .then(response => response.json().data as Schedule[])
                    .catch(this.handleError);
  }

  getStats(user: User, schedule: Schedule): Promise<Stats> {
    const url = `${this.statDataUrl}/${schedule.crn}`;
    return this.http
          .get(url)
          .toPromise()
          .then(response => response.json().data as Stats)
          .catch(this.handleError);
  }

  updateAttendance(schedule: Schedule): Promise<Schedule> {
    return this.http
      .post(this.scheduleUrl, JSON.stringify(schedule), {headers: this.headers})
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
