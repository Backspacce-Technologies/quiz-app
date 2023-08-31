import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
	providedIn: 'root'
})

export class LocalStorageService {

	constructor() { }

	getItem(key: string): any {
		return localStorage.getItem(key);
	}

	saveItem(key: string, data: string): void {
		return localStorage.setItem(key, data);
	}

	removeData(key: string) {
		return localStorage.removeItem(USER_KEY)
	}

	clear(key: string) {
		return localStorage.clear();
	}
}
