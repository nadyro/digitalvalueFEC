import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ReactiveFormsModule } from '@angular/forms';


//Components
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthComponent } from './auth/auth.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AverageHoverComponent } from './average-hover/average-hover.component';
import { AuthSubComponent } from './auth-sub/auth-sub.component';
import { ProfileComponent } from './profile/profile.component';

//Services
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    AuthComponent,
    GraphsComponent,
    AverageHoverComponent,
    AuthSubComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [AppService, AuthService, CookieService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
