/*******************************************************************************
*
* This page specifies the login commands and sends a Promise to the backend
* to verify the user is in the table
*
* @author         : Quinton Dean & Shelby Wagner
* @date_created:  : 4/7/2017
* @last_modified  : 4/29/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { User }         from './user';
import { AuthService }  from '../auth.service';
import { SharedService } from '../shared.service';
import { ScheduleComponent }  from '../schedule/schedule.component';
import { CrnClass }           from '../schedule/crn.class';
import { Schedule }           from '../schedule/schedule';
import { ScheduleService }    from '../schedule/schedule.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ScheduleComponent]
})
export class LoginComponent {
  //message: string;
  message = '';
  user: User = {
    name: '',
    password: '',
    permission: 'S'
  };
  schedules: Schedule[];
  //array = [];
  test: Schedule;
  crn: CrnClass[];

    constructor(public authService: AuthService,
                public router: Router,
                private sharedService: SharedService,
                private scheduleComponent: ScheduleComponent,
                private scheduleService: ScheduleService
    ) {this.setMessage();}

    setMessage() {
      this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in': 'out');
    }

    login() {
      this.message = this.user.name + this.user.password;

      this.authService.login(this.user).then/*subscribe*/(bool => {
        this.setMessage();
        this.authService.isLoggedIn = bool;
        if(this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/schedule';
          this.message = this.authService.isLoggedIn.toString();
          this.sharedService.setUser(this.user);
          this.router.navigate([redirect]);
        } else {
          this.message = this.authService.isLoggedIn.toString();
        }
      });
    }

    logout() {
      this.authService.logout();
      this.setMessage();
    }
}
