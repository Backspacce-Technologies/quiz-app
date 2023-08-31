import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { __values } from 'tslib';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	form: any = {
		email: null,
		password: null
	}
	isSuccessful = false;
	isSignUpFailed = false;
	errorMessage = '';
	roles: string[] = [];
	user: any;
	invalidLoginAttempt: boolean = false;
	

	constructor(
		private localStorage: LocalStorageService,
		private authenticationService: AuthenticationService,
		private router: Router) {


	}

	ngOnInit(): void {

		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
			password: new FormControl('', [Validators.required, Validators.minLength(5)])

		});

		console.log(this.loginForm)
		console.log(this.emailControl)
		


	}
	get emailControl(): FormControl {
		return this.loginForm.get('email') as FormControl;
	}

	get passwordControl(): FormControl {
		return this.loginForm.get('password') as FormControl;
	}

	



	onSubmit() {
		console.log(this.loginForm.valid)
		if (this.loginForm.valid) {
			console.log(this._v());
			this.loginviaPassword();
		}
		else{
			this.loginForm.markAllAsTouched(); 
			this.invalidLoginAttempt = true;
		}
	}


	_v() {
		return this.loginForm.value;
	}

	Invalid(){
		return this.loginForm.invalid;
	}



	loginviaPassword() {
	
		const reponse: any = this.authenticationService.login(this.loginForm.value);
		console.log("reponse", reponse);
		
	
		if (reponse.status == 200 && reponse.msg) {
			
			this.router.navigateByUrl("/home");
			
			
		}
		else {
			
			this.invalidLoginAttempt = true;
			console.log("Invalid user");
		}

	}

	
		
	





}






