import { Component, OnInit } from '@angular/core';
import { Cart, Product, Signup } from '../../models/dataTypes';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerSignupService } from '../../services/customer-signup.service';
import { ShopService } from '../../services/shop.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class CustomerSignupComponent implements OnInit{

  public signupMsg: string = ''

  constructor(private fb: FormBuilder, private router: Router, private signupService: CustomerSignupService,
    private shopService: ShopService){}

  customerSignupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  customerLoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.signupService.reloadSeller()
  }

  onSignup(){
    let userData = this.customerSignupForm.value as Signup
    this.signupService.signupUser(userData).subscribe((res)=>{
      // console.log(res);
      if(res){
        this.signupMsg = `You Have Successfully Signed Up, Please Login`
        this.router.navigate(['/customer-signin'])
        this.customerSignupForm.reset()
      }
    }, (err)=>{
      // console.warn(err.error.message);
      this.signupMsg = err.error.msg
      this.customerSignupForm.reset()
    })
    
  }

  onLogin(){
    let userData = this.customerLoginForm.value as Signup
    this.signupService.loginUser(userData)
    
    this.signupService.signupMsg.subscribe((res)=>{
      if(res){
        // console.log(res);
        this.signupMsg = "Please Enter Valid Credentails"
        this.customerLoginForm.reset()
      }
      
    })
  }
  
  
}
