import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { User }         from './user';
import { AuthService }  from '../auth.service';

@Component({
  selector: 'login-button',
  templateUrl: './login.button.html'
})
export class LoginButton {
  //message: string;
  message = '';
  user: User = {
    name: '',
    password: '',
    permission: ''
  };

  constructor(public authService: AuthService,
              public router: Router) {
                this.setMessage();
              }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in': 'out');
  }

  login() {
    this.message = this.user.name;

    this.authService.login(this.user).then(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
        //this.message = 'Redirected';
        this.router.navigate([redirect]);
      } else {
        this.message = 'fkin failed'
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
