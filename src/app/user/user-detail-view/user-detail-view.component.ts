import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { CommonService } from 'src/app/common/common.service';
import { NoteDetailsService } from 'src/app/common/note-details/note-details.service';
import { result } from 'underscore';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-detail-view',
  templateUrl: './user-detail-view.component.html',
  styleUrls: ['./user-detail-view.component.scss']
})
export class UserDetailViewComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  faMapMarkerAlt =  faMapMarkerAlt;
  faPrint = faPrint;
  faEye = faEye;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faPen = faPen;
  faPlus = faPlus;
  faFileCsv = faFileCsv;
  faFileExcel = faFileExcel;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  idString;
  basicDetails;
  rolePrivilages;
  utilitysList;
  moduleLists=[];
  userSkills;
  userArea;
  skillListByUtilitys=[]
  areaListByUtilitys = []
  notes = []
  coordinateList: any[] = []
  // Forms build start
  skillDetailsForm: FormGroup;
  skillDetailsFormSubmitted = false;
  areaDetailsForm: FormGroup;
  areaDetailsFormSubmitted = false;
  // Forms build end

  // Data for lifeCycle details start
  timeLine = []
  // Data for lifeCycle details end

  // Data for address details start
  address = []
  // Data for address details end

  constructor(private route : ActivatedRoute, private formBuilder: FormBuilder,private userService:UserService,
              private noteService : NoteDetailsService, private apiService:ApiService, private sessionService:SessionService,
              private commonService:CommonService) {
                
    this.skillDetailsForm = this.formBuilder.group({
      skillControl:[null, ],           
    });
    this.areaDetailsForm = this.formBuilder.group({
      areaControl:[null, ],           
    });

    this.route.params.subscribe(params => {
      this.idString = params.id_string
    });


    // get user basic Details
    this.apiService.get('user/'+this.idString).subscribe(details=>{
      this.basicDetails = details.results
      console.log("BASIC",this.basicDetails)
      if(details.results){
        this.coordinateList = this.commonService.setCoordinatesData(details.results)
        this.commonService.loadMap(this.coordinateList)
      }
     

      // User notes api call start
	  	notesPromise.then(data=>{
	  		for(let item of data.results){
	  			this.notes.push({
		            id : item.id_string,
		            note_name : item.note_name,
		            note_color : item.note_color,
		            note : item.note,
		            date : item.created_date,
		            time : item.created_date,
		            user : this.basicDetails.user_id,
		        })
	  		}
	  	})
	  	// User notes api call end
    })
    
    const skillPromise = this.apiService.get('user/'+this.idString+'/skill/').toPromise();
    const areaPromise = this.apiService.get('user/'+this.idString+'/area/').toPromise();
    const notesPromise = this.apiService.get('user/'+this.idString+'/note/list').toPromise();
    const lifeCyclesPromise = this.apiService.get('user/'+this.idString+'/life-cycle').toPromise();

    // get user role and privileges details and create module submodule list
    this.userService.getUserRolePrilvilages(this.idString).subscribe(roleDetails=>{
      this.rolePrivilages = roleDetails.data.roles
      for(let module of roleDetails.data.roles){
        this.moduleLists.push(module.modules.module)
      }

      skillPromise.then(skillData=>{
        this.userSkills = skillData.data.skills
      })

      areaPromise.then(areaData=>{
        this.userArea = areaData.data.areas
        this.address = [
          {
            address: areaData.data.areas,
            heading : 'User Address'
          },
        ]
        });
        
      // User life-cycles Api start
      lifeCyclesPromise.then(data=>{
        for(let item of data){
          this.timeLine.push({
            date  : item.created_date,
            title : item.title +' '+ item.state.toLowerCase(),
            time  : item.created_date,
            text  : item.lifecycle_text
          })
        }
      })
      // User life-cycles Api end
      
    })

    //get user utility list
    this.userService.getUserUtilitys(this.idString).subscribe(utilityList=>{
      this.utilitysList = utilityList.data.utilities
      // get skill list by user utility
      for(let utilitys of this.utilitysList){
        console.log("UJUJUJUJUJJ",utilitys.id_string)
        this.userService.getAllSkillsByUtility(utilitys.id_string).subscribe(skillList=>{
          for(let skill of skillList){
            if (!this.skillListByUtilitys.some((item) => item.id_string == skill.id_string)) {
              this.skillListByUtilitys.push({skill:skill.skill,id_string:skill.id_string})
            }
          }
        });
        // get arealist by user utility
        this.userService.getAllAreaByUtility(utilitys.id_string).subscribe(areaList=>{
          for(let area of areaList){
            if (!this.areaListByUtilitys.some((item) => item.id_string == area.id_string)) {
              this.areaListByUtilitys.push({name:area.name,id_string:area.id_string})
            }
          }
        });
      }
    })

     
   }
   // Skill details form control start
   get sd() { return this.skillDetailsForm.controls; }
   // Skill details form control end

   // Area details form control start
   get ad() { return this.areaDetailsForm.controls; }
   // Area details form control end

   // Skill details form submit start
   skillList=[]
   skillAddMsg:boolean=false
   onSillDetailsFormSubmit() {
    this.skillDetailsFormSubmitted = true;

    if (this.skillDetailsForm.invalid) {
        return;
    }else{
      for(let skills of this.skillDetailsForm.value.skillControl){
        if (!this.skillList.some((item) => item.skill_id_string == skills.id_string)) {
        this.skillList.push({"skill_id_string":skills.id_string})
        }
      }
      this.userService.addUserSkills(this.idString,this.skillList).subscribe(result=>{
        this.skillAddMsg = true 
        // window.location.reload();       
      })
    }
  }
  // Skill details form submit end


   // Area details form submit start
   areaList=[]
   areaAddMsg:boolean=false
   onAreaDetailsFormSubmit() {
    this.areaDetailsFormSubmitted = true;
    if (this.areaDetailsForm.invalid) {
        return;
    }else{
      for(let area of this.areaDetailsForm.value.areaControl){
        if (!this.areaList.some((item) => item.area_id_string == area.id_string)) {
        this.areaList.push({"area_id_string":area.id_string})
        }
      }
      this.userService.addUserArea(this.idString,this.areaList).subscribe(result=>{
        this.areaAddMsg = true  
        // window.location.reload();      
      })
    }
  }
  // Area details form submit end
  

  skillLists;
  utilityIdString;
  subscription: Subscription 
  subscription_edit: Subscription
  addedSuccessfullyToast=false;
  exceptionToast = false;
  ngOnInit(): void {


    // Code for receiving note edit data from note component start
    this.subscription = this.noteService.getNoteEditResponse().subscribe(data_edit=>{
      console.log("EDIT DATA",data_edit)
      this.utilityIdString = this.sessionService.getter("utility_id_string_admin")
      this.apiService.put('user/note/'+data_edit['data_edit'].note_card_id+'/utility/'+this.utilityIdString,data_edit['data_edit']).subscribe(resp=>{
        console.log('resp: ', resp);
        if(resp.state == 'success'){
          this.addedSuccessfullyToast=true;
          // setTimeout(() => {
          //   window.location.reload()
          //  }, 3000);
        }else{
          this.exceptionToast = true;
          setTimeout(() => {
            window.location.reload()
           }, 3000);
        }
      })
    })
    // Code for receiving note edit data from note component end

    // Code for receiving note add data from note component start
    this.subscription = this.noteService.getNoteResponse().subscribe(data=>{
      this.utilityIdString = this.sessionService.getter("utility_id_string_admin")
      this.apiService.post('user/'+this.idString+'/utility/'+this.utilityIdString+'/note',data['data']).subscribe(resp=>{
        console.log('resp: ', resp);
        if(resp.state == 'success'){
          this.addedSuccessfullyToast=true;
          setTimeout(() => {
            window.location.reload()
           }, 3000);
        }else{
          this.exceptionToast = true;
          setTimeout(() => {
            window.location.reload()
           }, 3000);
        }
      })
    })
    // Code for receiving note add data from note component end


    
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  public show:boolean = false;
  public buttonName: any;
  toggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  public showskill:boolean = false;
  addskills() {
    this.showskill = !this.showskill;
  }
  
  // Data for kyc details start
  kycDocs = [
  	{
  		name : 'Pan card',
  		doc : '../../assets/images/upload1.jpg'
  	},
  	{
  		name : 'Energy bill',
  		doc : './../assets/images/upload2.jpg'
  	}
  ]
  // Data for kyc details end

  module_id_string:any = this.sessionService.getter("module_id_string")
  sub_module_id_string:any = this.sessionService.getter("sub_module_id_string")
  fileObj: File;
  fileUrl: string;
  errorMsg: boolean

  onFilePicked(event: Event): void {

    this.errorMsg = false
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    console.log(this.fileObj);
  }
  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    fileForm.append('user_id_string', this.idString);
    fileForm.append('utility_id_string', this.utilityIdString);
    fileForm.append('module_id_string', this.module_id_string);
    fileForm.append('sub_module_id_string', this.sub_module_id_string);
    console.log('fileForm: *******', fileForm);
    this.commonService.fileUpload(fileForm).subscribe(res => {
      this.fileUrl = res['image'];
    });
  }


}
