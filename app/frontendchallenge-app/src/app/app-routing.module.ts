import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { AuthSubComponent} from './auth-sub/auth-sub.component'

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'authSub', component: AuthSubComponent },
  
  { path: '', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
