import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  //styleUrl: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

  }
}
