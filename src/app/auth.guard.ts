import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './common/common.service';

@Injectable()

export class AuthGuard implements CanActivate {
  
  constructor(private commonService:CommonService, private router:Router){}

  canActivate():boolean{
    if(this.commonService.loggedIn()){
      return true
    }else{
      this.router.navigateByUrl('/auth/login');
      return false
    }
  }
  
}
