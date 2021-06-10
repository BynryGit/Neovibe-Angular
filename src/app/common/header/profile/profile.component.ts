import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faSearch, faMapMarkerAlt, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import * as _ from 'underscore';
import { CommonService } from '../../common.service';
import { ApiService } from '../../../common-services/api-service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { string2csv } from '@ctrl/ngx-csv';
@Component({
  selector: 'smart360-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faSearch = faSearch;
  faChevronDown = faChevronDown;
  faMapMarkerAlt = faMapMarkerAlt;
  faBell = faBell;
  faPlus = faPlus;
  first_name_c;
  last_name_c;
  



  
  id_string_user=this.sessionService.getter("id_string");
  id_string;
  userList :any= [];
  addedSuccessfullyToast = false;
  constructor(private apiService : ApiService,private commonService:CommonService,private router:Router,
    private sessionService:SessionService, private cookieService:CookieService) {
      this.apiService.get('user/'+this.id_string_user).subscribe(data => {
        console.log("CALLED")
        this.first_name_c = data.results.first_name.charAt(0)
        this.last_name_c = data.results.last_name.charAt(0)
  
      }) 
      console.log("FIJEienvn",this.first_name_c)
     }
  selectItem(selectedVal){
    //get value of token and id string from sessionStorage
    this.id_string =  this.sessionService.getter("id_string")

    

    if(selectedVal === 'Logout'){
      this.commonService.logOut(this.id_string).subscribe((data:any) =>{
        if(data.state === "success"){
          // this.addedSuccessfullyToast = true;
          this.sessionService.clear();
          this.cookieService.deleteAll() 
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login'); 
           }, 1000);
          
        }
      })
    }
    else if(selectedVal === 'Change Password'){
      this.router.navigateByUrl('/auth/change-password'); 
    }
  }

  

  profile = { data: [
    {first :this.sessionService.getter('first_name_char'),
    img : '../../../assets/images/profile-pic.png'   
    }] ,
  links : [
    { options : 'ESS', link:"#"},
    { options : 'Helpdesk', link:"#"},
    { options : 'Help', link:"#"},
    { options : 'Change Password', link:"change-password"},
    { options : 'Logout', link:"#"}
  ] 
  };

  roleList=[];
  data={}
  selectedRole;
  ngOnInit(): void {

    

    

    // this.commonService.checkRolePrivilege().subscribe((result:any)=>{
    //   if(this.sessionService.getter('role_id_string')){
    //     this.selectedRole = this.sessionService.getter('role_id_string')
    //   }else{
    //   this.selectedRole = result.data.roles[0].role
    //   }

    //   for(let role of result.data.roles){
    //     this.roleList.push({
    //       "id_string":role.id_string,
    //       "name":role.role
    //     })
    //   }
    // })
  }

  onRoleSelected(role_id_string){
    this.sessionService.setter("role_id_string",role_id_string)
    
  }
}
