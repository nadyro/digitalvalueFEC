import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { timeout, take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService: CookieService, private profileService: ProfileService) { }
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.pattern(/^([a-zA-Z\d \xC0-\xF6\-œ\'\xF8-\xFF]{1,})$/)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d{1,})(?=.*[\x21-\x2f]{1,}).*$/), Validators.required]),
    new_password: new FormControl('', [Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d{1,})(?=.*[\x21-\x2f]{1,}).*$/)]),
  });

  profileusername = "";
  name = "";
  surname = "";
  address = "";
  zip = "";
  city = "";
  birthday = new Date().toUTCString;
  profileemail = "";
  gender = "";
  gender_specified = "";
  activity: any = {};
  profileValidation = 0;
  profileMessage = "";
  classAttribute = "";
  get username() {
    return this.profileForm.get('username');
  }
  get email() {
    return this.profileForm.get("email");
  }
  get password() {
    return this.profileForm.get("password");
  }
  get new_password() {
    return this.profileForm.get('new_password');
  }
  onSubmit(value) {
    this.profileService.updateUser(this.profileForm.value).subscribe(res => {
      this.profileValidation = res['updated'];
      if (this.profileValidation == 1)
        this.classAttribute = "successfulValidation"
      else
        this.classAttribute = "wrong_password"
      this.profileMessage = res['message'];
      const seconds = interval(2000);
      seconds.pipe(take(1)).subscribe(res => {
        this.classAttribute = "";
      });
    });
  }
  ngOnInit() {
    var username = this.cookieService.get("username");
    this.profileService.getUser(username).subscribe(res => {
      this.activity = res['data']['cookies'];
      this.profileusername = res['data']["username"];
      this.name = res['data']['name']
      this.surname = res['data']['surname'];
      this.address = res['data']['address'];
      this.zip = res['data']['zip'];
      this.city = res['data']['city'];
      this.birthday = new Date(res['data']['birthday']).toUTCString;
      this.profileemail = res['data']['email'];
      this.gender = res['data']['gender'];
      this.gender_specified = res['data']['gender_specified'];
      this.profileForm.setValue(({ username: this.profileusername, email: this.profileemail, password: '', new_password: '' }));
    })
  }

}
