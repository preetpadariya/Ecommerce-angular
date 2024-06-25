import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerSignupService } from '../../services/customer-signup.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopService } from '../../services/shop.service';
import { Signup } from '../../models/dataTypes';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-signin.component.html',
  styleUrls: ['./customer-signin.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class CustomerLoginComponent implements OnInit {
  public loginMsg: string = ''

  constructor(private fb: FormBuilder, private router: Router, private signupService: CustomerSignupService,
    private shopService: ShopService){}

  customerLoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.signupService.reloadSeller();
  }

  onLogin() {
    let userData = this.customerLoginForm.value as Signup;
    this.signupService.loginUser(userData);

    this.signupService.signupMsg.subscribe((res) => {
      if (res) {
        this.loginMsg = 'Please Enter Valid Credentails';
        this.customerLoginForm.reset();
      }
    });
  }
}
