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

  constructor(public authService: AuthService, private router: Router, private cookieService: CookieService) { }

  authLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(id) {
    this.authService.log(this.authLoginForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/categories']);
    })
  }
  ngOnInit() {
    this.cookieService.deleteAll();
  }

}
