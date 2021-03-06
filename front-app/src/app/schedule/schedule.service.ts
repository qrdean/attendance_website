/*******************************************************************************
*
* This page defines the promise functions that communicate with the backend
* and return either a valid value or an error that is caught and passed to
* handleError()
*
* @author         : Quinton Dean
* @date_created:  : 4/7/2017
* @last_modified  : 4/30/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Schedule }        from './schedule';
import { User }            from '../login/user';
import { CrnClass }        from './crn.class';
@Injectable()
export class ScheduleService {
  private scheduleUrl = 'api/schedules'; // URL to web api
  private headersJSON = new Headers({'Content-Type': 'application/json'});
  private headersUrlEnc = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private realScheduleUrl = 'http://50.24.235.40:8080/courseList';
  private realScheduleUrl2 = 'http://50.24.235.40:8080/courseInfo';
  private realAttendanceUrl = 'http://50.24.235.40:8080/attend';
  constructor(private http: Http) { }

  // Gets the schedule
  getScheduleCombine(user: User): Observable<any[]> {
    var creds = "id=" + user.name;
    return this.http.post(this.realScheduleUrl, creds, {headers: this.headersUrlEnc})
      .map((res: any) => res.json())
      .flatMap((resp2: any[]) => {
        if(resp2.length > 0) {
          return Observable.forkJoin(
            resp2.map((resp3: any) => {
              var creds2 = "crn=" + Number(resp3.crn) + "&id=" + Number(user.name);
              return this.http.post(this.realScheduleUrl2, creds2, {headers: this.headersUrlEnc})
                .map((res: any) => {
                  let classInfo: any = res.json();
                  resp3.classInfo = classInfo;
                  return resp3;
                })
            })
          )
        }
        return Observable.of([]);
      })
  }

  // Updates the attendance in the database
  realUpdateAttendance(crn: string, user: string): Promise<boolean> {
    var creds = "crn=" + Number(crn) + "&id=" + Number(user);
    return this.http
               .post(this.realAttendanceUrl, creds, {headers: this.headersUrlEnc})
               .toPromise()
               .then(response => response.json() as boolean)
               .catch(this.handleError);
  }

  // add user id in params passed.
  getScheduleTest(): Promise<Schedule[]> {
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
