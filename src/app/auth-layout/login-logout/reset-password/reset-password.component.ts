import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import {CommonService } from '../../../common/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

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
    this.route.params.subscribe(params => {
      this.token=params['<token>'];
      this.uidb64=params['<uidb64>'];
      console.log(this.token);
      console.log(this.uidb64);
    });

    this.model={
      token:this.token,
      uidb64:this.uidb64
    }

  }

  // reset password
  resetPassword(){
    this.commanservice.resetPassword(this.model).subscribe(() =>{
      console.log("success");
      this.addedSuccessfullyToast = true;
      this.router.navigateByUrl('/auth/login');
    }, error => {
      console.log(error);
      this.exceptionToast = true;
      console.log(this.model);
    }) 

  }


}
