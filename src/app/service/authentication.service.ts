import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private authToken: string = '';
	isLoggedIn = new BehaviorSubject<boolean>(false)
	newUserEmail: string = "test@gmail.com";
	newUserPassword: string = "12345";


	constructor(private readonly ls: LocalStorageService, private router: Router) { }

	createToken(length: any) {
		let result = ''
		const charslength = chars.length;
		for (let i = 0; i < 32; i++) {
			result += chars.charAt(Math.floor(Math.random() * charslength));
		}
		return result;
	}

	login(creds: any) {
		if (creds.email == this.newUserEmail && creds.password == this.newUserPassword) {
			const userInfo: any = {
				email: creds.email,
				token: this.createToken(9)
			};
			this.ls.saveItem("userInfo", JSON.stringify(userInfo))
			return {
				status: 200,
				msg: this.createToken(9)
			};
		} else {
			return {
				status: 400,
				msg: "Invalid credentials"
			};
		}
	}

	logout() {
		localStorage.clear();
	}

	isUSerLoggedIn() {
	

		if (localStorage.getItem("userInfo")) {
			const userInfo: any = JSON.parse(localStorage.getItem("userInfo")!);
			if (!!userInfo && userInfo.token) {
				// this.router.navigateByUrl('/home');
				return true;
			} else {
				
				return false;
			}
		} else {
			// this.router.navigateByUrl('/login');
			return false;
		}
	}



}
