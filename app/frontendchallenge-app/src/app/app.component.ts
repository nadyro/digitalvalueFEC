import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'G.O.D';
  constructor(public appService: AppService, public authService: AuthService, public cookieService: CookieService) {

  }
  logout() {
    this.authService.logoutAndSave(this.cookieService.getAll()).subscribe(res => {
      this.cookieService.deleteAll();
      location.reload();

    })
    this.authService.logout;
  }
  ngOnInit() {

  }
}
