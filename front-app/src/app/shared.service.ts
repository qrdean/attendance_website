import { Injectable } from '@angular/core';
import { User }       from './l0gin/user';
import { Schedule }   from './schedule/schedule';
@Injectable()
export class SharedService {
  public sharedUser: User;
  public sharedSchedule: Schedule;

  setSchedule(schedule) {
    this.sharedSchedule = schedule;
  }

  getSchedule() {
    return this.sharedSchedule;
  }

  setUser(user) {
    this.sharedUser = user;
  }

  getUser() {
    return this.sharedUser;
  }
}
