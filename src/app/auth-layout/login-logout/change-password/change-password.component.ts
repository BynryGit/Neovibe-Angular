import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import {CommonService } from '../../../common/common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  model:any ={};
  token;
  uidb64;
  addedSuccessfullyToast = false;
  exceptionToast = false;

  public logindiv:boolean = true;
  login() {
    this.logindiv = true;
    this.signupdiv = false;
    this.forgotpwddiv = false;
    this.resetpwddiv = false;
  }
  public signupdiv:boolean = false;
  signup() {
    this.signupdiv = true;
    this.logindiv = false;
    this.forgotpwddiv = false;
    this.resetpwddiv = false;
  }
  public forgotpwddiv:boolean = false;
  forgotpwd() {
    this.forgotpwddiv = true;
    this.logindiv = false;
    this.signupdiv = false;
    this.resetpwddiv = false;
  }
  public resetpwddiv:boolean = false;
  resetpwd() {
    this.resetpwddiv = true;
    this.logindiv = false;
    this.signupdiv = false;
    this.forgotpwddiv = false;
  }

  showpwd1:boolean = false; 
  showpwd2:boolean = false;
  showpwd3:boolean = false;
  showpwd4:boolean = false;
  showhidepwd1() {
    this.showpwd1 = !this.showpwd1;
  }
  showhidepwd2() {
    this.showpwd2 = !this.showpwd2;
  }
  showhidepwd3() {
    this.showpwd3 = !this.showpwd3;
  }
  showhidepwd4() {
    this.showpwd4 = !this.showpwd4;
  }

  constructor(private formBuilder: FormBuilder,public router: Router,private commanservice:CommonService,private route: ActivatedRoute) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  
  ngOnInit(): void {

    $(document).ready(function(){
      $('.main-container').css('margin', '0');
      $('#resetsidebar').click(function(){
      });
    });
 
  }


  // changePassword(){
  //   this.commanservice.NewPassword(this.model).subscribe(() =>{
  //     console.log("success");
  //   }, error => {
  //     console.log(error);
  //   }) 

  // }

  changePassword(f: NgForm){
    const changePasswordObserver = {
      next: x => {
        console.log('success')
        this.addedSuccessfullyToast = true;
        this.router.navigateByUrl('/auth/login');
      },
        
      error: err => {
        console.log(err);
        console.log(this.model);
        this.exceptionToast = true;
      }
    };
    this.commanservice.changePassword(f.value).subscribe(changePasswordObserver);
  }

}
