import { Injectable } from '@angular/core';
import { User }       from './l0gin/user';
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
