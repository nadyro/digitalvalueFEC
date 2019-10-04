import { Component, OnInit, HostBinding } from '@angular/core';
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
  constructor(private appService: AppService, private authService: AuthService, private cookieService: CookieService) {

  }
  logout(){
    this.authService.logoutAndSave(this.cookieService.getAll()).subscribe(res => {
      console.log(res);
    })
    this.authService.logout;
  }
  ngOnInit() {
    
  }
}
