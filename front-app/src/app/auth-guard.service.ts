/*******************************************************************************
*
* This page defines our guards for our links. If the user is not allowed verified
* then the link will not work and will return false. 
*
* @author         : Quinton Dean
* @date_created:  : 4/26/2017
* @last_modified  : 4/27/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/
import { Injectable }   from '@angular/core';
import { CanActivate, Router,
   ActivatedRouteSnapshot,
   RouterStateSnapshot
}                       from '@angular/router';
import { AuthService }  from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;

  }


}
