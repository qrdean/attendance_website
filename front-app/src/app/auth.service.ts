import { Injectable }   from '@angular/core';
import { Headers, Http }  from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { User }       from './l0gin/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  private loginUrl = 'api/login';
  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrlReal = 'http://50.24.235.40:8080/login';
  redirectUrl: string;
  constructor(private http: Http) { }

  loginFake(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  // permission level string
  // id string
  // password string
  login(user: User): Promise<boolean> {
    return this.http.post(this.loginUrlReal, {id: user.name, password: user.password, permission: user.permission}, {headers: this.headers})
                    .toPromise()
                    .then((val => this.isLoggedIn=true) )
                    .catch(this.handleError);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  private handleError(error: any): Promise<any>  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
