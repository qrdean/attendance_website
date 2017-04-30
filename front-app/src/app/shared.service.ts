/*******************************************************************************
*
* This page is used to share data from component to component
*
* @author         : Quinton Dean
* @date_created:  : 4/26/2017
* @last_modified  : 4/27/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/
import { Injectable } from '@angular/core';
import { User }       from './login/user';
import { Schedule }   from './schedule/schedule';

@Injectable()
export class SharedService {

  public sharedSchedule: string[];
  setSchedule(schedule: string, i) {

    this.sharedSchedule[i] = schedule;
  }

  getSchedule() {
    return this.sharedSchedule;
  }

  public sharedUser: User;
  setUser(user) {
    this.sharedUser = user;
  }

  getUser() {
    return this.sharedUser;
  }
}
