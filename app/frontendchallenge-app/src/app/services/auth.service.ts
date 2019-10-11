import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthService {
    expiresAt: Number;
    userProfile: any;
    authenticated: boolean;

    constructor(public router: Router, public http: HttpClient, public cookieService: CookieService) {
    }
    port = 8081;
    api_url = "http://localhost:" + this.port + "/api/fecApi";

    public _setSession(profile) {
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
    logoutAndSave(cookies_user) {
        var obj = { userCookies: cookies_user };
        return (this.http.post(this.api_url + '/saveUserCookies', obj).pipe(map(res => {
            return (res);
        })))
    }
    addUser(formGroup): Observable<any> {
        return (this.http.post(this.api_url + '/addUser', formGroup).pipe(map(res => {
            return (res);
        })));
    }
    log(formGroup): Observable<any> {
        this.cookieService.set("username", formGroup.email);
        return (this.http.post(this.api_url + '/fetchUserAndCookies', formGroup).pipe(map(res => {
            if (res['loggedIn']) {
                if (res['userCookies']) {
                    this.cookieService.set("firstLevelCategory", res['userCookies'].firstLevelCategory);
                    this.cookieService.set("firstLevelCategoryName", res['userCookies'].firstLevelCategoryName);
                    this.cookieService.set("secondLevelCategory", res['userCookies'].secondLevelCategory);
                    this.cookieService.set("secondLevelCategoryName", res['userCookies'].secondLevelCategoryName);
                    this.cookieService.set("thirdLevelCategory", res['userCookies'].thirdLevelCategory);
                    this.cookieService.set("thirdLevelCategoryName", res['userCookies'].thirdLevelCategoryName);
                    this.cookieService.set("steps", res['userCookies'].steps);
                    this.cookieService.set("yearSelected", res['userCookies'].yearSelected);
                }
                this._setSession(formGroup.email);
                this.router.navigate(['/']);
            }
            return (res);
        })))
    }
}