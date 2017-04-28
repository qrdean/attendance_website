/*
This page specifies the login commands and sends a Promise to the backend
to verify the user is in the table

Quinton Dean  4/25/2017 Created file

*/
import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { User }         from './user';
import { AuthService }  from '../auth.service';
import { LoginButton }  from './login.button';
import { SharedService } from '../shared.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //message: string;
  message = '';
  user: User = {
    name: '',
    password: '',
    permission: 'S'
  };

    constructor(public authService: AuthService,
                public router: Router,
                private sharedService: SharedService
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
  /*
  this method loginsubmit will compare an entered username and password to my dummy data
  saw051 and password1 if true then we will display a message in the console log else we will
  display an error message in the console log and below the login button.
  */
  loginsubmit(){
	  if(this.user.name == "saw051" && this.user.password == "password1"){
		  console.log('Hi'+this.user.name+'!');
	  }
	  else {
		  console.log('invalid username or password')
		  this.message = 'invalid username or password';
	  }
  }
}
