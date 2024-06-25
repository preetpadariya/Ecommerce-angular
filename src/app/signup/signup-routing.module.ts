import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { CustomerLoginComponent } from './customer-signin/customer-signin.component';

const routes: Routes = [
  {path: 'customer-signup', component: CustomerSignupComponent},
  {path: 'customer-signin', component: CustomerLoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
