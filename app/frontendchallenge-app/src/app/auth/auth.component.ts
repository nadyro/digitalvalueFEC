import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public cookieService: CookieService) { }
  errorMessage: "";
  authLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(id) {
    this.authService.log(this.authLoginForm.value).subscribe(res => {
      if (res['loggedIn'])
        this.router.navigate(['/categories']);
      else
      this.errorMessage = res['message'];
    })
  }
  ngOnInit() {
  }

}
