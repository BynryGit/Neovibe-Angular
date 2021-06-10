import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from "@angular/router";
import { CommonService } from '../../common/common.service';
import { NgForm } from '@angular/forms';
import { SessionService } from '../../common-services/session-service/session.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.scss']
})
export class LoginLogoutComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

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
  
  contentEditable;
  constructor(private router: Router,private apiService : ApiService, private commonService:CommonService,private formBuilder: FormBuilder,
    private sessionService:SessionService, private cookieService:CookieService) { 
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      form_factor: 1,
    });
  }

  get f() { return this.loginForm.controls; }

  matchingVal;
  id_string;
  roll_privilages;
  userList:[];
  toggleEditable(event) {
    if ( event.target.checked ) {
        this.contentEditable = true;
      }
}
  loginProcess(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        console.log(this.f?.username?.errors.required)
        return;
    }

    // if form is valid then call the login API
    if(this.loginForm.valid){
      this.commonService.login(this.loginForm.value).subscribe((result:any) =>{
        if(result.state === 'success'){ 
          
           
          //set token and id string in sessionStorage
          this.sessionService.setter("id_string",result.id_string)
          this.sessionService.setter("token",result.token)
          this.sessionService.setter("email",result.email)
          this.sessionService.setter("user_id",result.id)
          this.router.navigateByUrl('');   
          
        }
        if(this.contentEditable){
          console.log("Inside Checked")
          localStorage.setItem('email', result.email);
          localStorage.setItem('token', result.token);
        }
        this.apiService.get('user/'+result.id_string).subscribe(data => {
          console.log("CALLED")
          this.sessionService.setter("first_name_char",data.results.first_name.charAt(0))
          this.sessionService.setter("last_name_char",data.results.last_name.charAt(0))
          this.sessionService.setter("first_name",data.results.first_name)
          this.sessionService.setter("last_name",data.results.last_name)
        }) 
      },
      err =>{
        alert('Provided credentials are wrong.')
      })
    }
  }

  



  // send email for reset password
  onSubmit(f: NgForm){
    const resetPasswordObserver = {
      next: x => {
        alert('Password Reset Request Sent\n Please! check your email');
        console.log('Check email');
        this.router.navigateByUrl('/auth/login');
      },
      error: err => {
        alert('Provided credentials are wrong.')
        console.log(err)}
    };
    this.commonService.sendEmail(f.value).subscribe(resetPasswordObserver);
  }
  isRememberMeChecked;

  // rememberMeClicked(){
  //   if (isRemberMeChecked) {
  //     localStorage.setItem('Name', credentials.firstName);
  //     localStorage.setItem('token', credentials.token);     
  //   } else {
  //     sessionStorage.setItem('Name', credentials.firstName);
  //     sessionStorage.setItem('token', credentials.token);
  // }

  // }

  

  ngOnInit(): void {
    
    this.sessionService.clear();
    this.cookieService.deleteAll() 
    if(localStorage.getItem('email') != null){
      this.loginForm.controls.email.setValue(localStorage.getItem('email'))
    }

    $(document).ready(function(){
      $('.main-container').css('overflow', 'hidden');
    });
  }

}
