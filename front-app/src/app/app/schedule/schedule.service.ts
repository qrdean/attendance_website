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
@Injectable()
export class ScheduleService {
  private scheduleUrl = 'api/schedules'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  updateAttendance(schedule: Schedule): Promise<Schedule> {
    return this.http
      .post(this.scheduleUrl, JSON.stringify(schedule), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Schedule)
      .catch(this.handleError);
  }

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
