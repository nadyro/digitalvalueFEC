import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class ProfileService {
    expiresAt: Number;
    userProfile: any;
    authenticated: boolean;

    constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    }
    api_url = "http://localhost:3000/api/fecApi";

    updateUser(formGroup):Observable<any>{
      var obj = {formGroup: formGroup, cookies: this.cookieService.getAll()};
      return (this.http.put(this.api_url + '/updateUser', obj).pipe(map(res => {
        this.cookieService.set("username", formGroup.email);
        return (res);
      })));
    }
    getUser(userEmail){
      var obj = {userEmail: userEmail};
      return (this.http.get(this.api_url + '/getUser', {params: obj}).pipe(map(res => {
          return (res);
      })))
  }
}