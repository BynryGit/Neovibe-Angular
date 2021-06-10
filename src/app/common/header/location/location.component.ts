import { Component, OnInit } from '@angular/core';
import { faChevronDown, faSearch, faMapMarkerAlt, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { CommonService } from '../../common.service';
import * as _ from 'underscore';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'smart360-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;

  utilities:any;tenant:any;
  facilityId;
  constructor(private getData:CommonService,private sessionService:SessionService,private activatedRoute:ActivatedRoute
    ,private router:Router) { }
  ngOnInit(): void {

      this.activatedRoute.params.subscribe(params => {
        this.getUtilities(params.cid)
      });
      this.getData.getUserUtility().subscribe((response:any)=>{
        if(response.data == "No utilities assigned to user."){
          this.getData.getUserDetails().subscribe((response:any)=>{

            this.sessionService.setter("tenant_id_string",response.results.tenant.id_string)
            this.sessionService.setter("loginUser","Tenant")
            this.getData.getUtilities(response.results.tenant.id_string)
          })
        }else{
          this.sessionService.setter("loginUser","Utility")
          this.sessionService.setter("utility_id_string",response.data.utilities[0].id_string)
        }
      })
  }

  //change utility
  onOptionsSelected(utility_id_string){
    this.getData.getUtilities(utility_id_string) //pass utility data to bento menu hold in common service
    this.sessionService.setter("utility_id_string",utility_id_string)
    this.router.navigate(['/home'])
  }

  // API Call for taking utility list
  getUtilities(id?){
    if(!this.utilities){
      this.getData.getUserUtility().subscribe((response:any)=>{  
        console.log("CHECK RESPONSE 1",response.data)
        if(response.data == "No utilities assigned to user."){
          this.getData.getUserDetails().subscribe((tenant_response:any)=>{
            console.log("CHECK RESPONSE 2",tenant_response.results)
            this.sessionService.setter("tenant_id_string",tenant_response.results.tenant.id_string)
            this.facilityId = tenant_response.results.tenant.id_string
            this.utilities = [{"id_string":tenant_response.results.tenant.id_string,"name":tenant_response.results.tenant.name,"short_name":tenant_response.results.tenant.short_name}]
          })
        }
        else{
          console.log("TGTGTGTG",response.date)
          this.utilities = response.data.utilities
          id = id || this.sessionService.getter('utility_id_string')
  
          if(id){
            this.facilityId = _.find(this.utilities,function(utility){
              // check api utility id_string and selected id string are same
              return utility.id_string == id
            }).id_string
            
            this.sessionService.setter("utility_id_string",response.data.utilities[0].id_string)
            this.sessionService.setter("utility_name",response.data.utilities[0].name)
            this.sessionService.setter("tenant_id_string",response.data.utilities[0].tenant.id_string)
  
            this.getData.getUtilities(id)
          }else{
            console.log('*********if else',response.data.utilities[0].id_string);
              this.facilityId = response.data.utilities[0].id_string
              this.sessionService.setter("loginUser","Utility")
              this.sessionService.setter("utility_id_string",this.facilityId)
              this.sessionService.setter("utility_name",response.data.utilities[0].name)
              this.sessionService.setter("tenant_id_string",response.data.utilities[0].tenant.id_string)
              this.getData.getUtilities(this.facilityId)
          }
        }     
        
      })
    }
  }

}
