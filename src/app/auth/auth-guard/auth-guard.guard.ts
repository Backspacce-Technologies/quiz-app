import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/service/authentication.service';


@Injectable()
export class authGuardGuard {

	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
		const isAuthenticated = this.authenticationService.isUSerLoggedIn();
		// const isAuthenticated = localStorage.getItem("userInfo")
		console.log(this.authenticationService.isUSerLoggedIn())
		
		if (!isAuthenticated) {
			this.router.navigateByUrl('/login');
			return false;
		}
	
		
		return isAuthenticated;
	
		
	}
}