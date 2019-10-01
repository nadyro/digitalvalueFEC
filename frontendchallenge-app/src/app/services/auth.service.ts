import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    expiresAt: Number;
    userProfile: any;
    authenticated: boolean;

    constructor(private router: Router) {
    }

    private _setSession(profile) {
        this.expiresAt = 10000 * 1000 + Date.now();
        this.userProfile = profile;
        this.authenticated = true;
    }

    get isLoggedIn(): boolean {
        return Date.now() < this.expiresAt && this.authenticated;
    }
    get logout(): boolean {
        return this.authenticated = false;
    }
    log(formGroup): Observable<any> {
        this._setSession(formGroup.email);
        this.router.navigate(['/']);
        return (formGroup);
    }
}