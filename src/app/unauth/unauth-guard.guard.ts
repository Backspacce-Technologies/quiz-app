import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/service/authentication.service';


@Injectable()
export class unauthGuardGuard{
  
  constructor( private authenticationService: AuthenticationService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const isAuthenticated = this.authenticationService.isUSerLoggedIn();
   if(isAuthenticated){
    this.router.navigateByUrl('/home')
    return true;
   }
		return !isAuthenticated;
  }
};
