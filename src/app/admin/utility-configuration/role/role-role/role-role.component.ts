import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityConfigurationService } from '../../utility-configuration.service';
import { faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import {NgSelectComponent} from '@ng-select/ng-select'
declare var $:any;
import { Subject } from 'rxjs';


@Component({
  selector: 'app-role-role',
  templateUrl: './role-role.component.html',
  styleUrls: ['./role-role.component.scss'],
  providers: [ErrorMessage]
})
 

export class RoleRoleComponent implements OnInit {

  
  
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faPrint = faPrint;
  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;

  selectFilterDepartment: any
  filterDepartment = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Billing' }

  ]
  selectFilterStatus: any
  filterStatus = [
    { id: 1, name: 'status 1' },
    { id: 2, name: 'status 2' },
    { id: 3, name: 'status 3' }

  ]
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addRoleForm: FormGroup;
  addRoleFormSubmitted = false;
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  dtOptions: any = {};
  constructor(private utilityConfigService: UtilityConfigurationService, private sessionService: SessionService,
              private router: Router,private formBuilder: FormBuilder,private apiService : ApiService) { 
                // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      roleTypeControl: [null, [Validators.required]],
      roleSubTypeControl: [null, [Validators.required]],
      roleNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern('^[a-zA-Z \-\']+')]],
      roleDescriptionControl: [null, [Validators.required,this.noWhitespaceValidator]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      // roleTypeControlEdit: [null, [Validators.required]],
      // cityNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
    });

    // Taking the Role list view data
    // this.utilityConfigService.getRoleListByutility().subscribe(data => {
    //   for(let item of data['results']){
    //     this.roles.push(item)
    //     this.roleList.push(item)
    //   }
    // })
}

noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
  const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

  roles = []
  roleList = [];
  roleTypes;
  roleSubTypes; roleTypeLists = [];roleTypeList;
   formFactorList; departmentList;
  privilegeList; moduleSubModuleList; roleSubType;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  showContent = true;
  utilityIdString = this.sessionService.getter("utility_id_string_admin")
  dataSet = [

  ]

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end
  
  activeIds: string[] =[];
  panels = [0, 1,2,3]

  openAll()
  {
    this.activeIds = this.panels.map(p => "panel-"+ p);
    console.log(this.activeIds);
  }


  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.showContent = false;
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormSubmitted = false;
    this.showContent = false;
  }

 

  

  
  ngOnInit(): void {
    

    


    //Taking Role type list
    this.utilityConfigService.getRoleTypeListByUtility().subscribe(rolesType => {
      for (let item of rolesType.results) {
        this.roleTypeLists.push(item)
      }
      this.roleTypeList = this.roleTypeLists
    })
    // Taking the formFactor List
    // this.utilityConfigService.getFormFactorList().subscribe(formFactor => {
    //   this.formFactorList = formFactor.results
    // })

    // Taking Department list
    // this.utilityConfigService.getDepartmentListbyTenant().subscribe(department => {
    //   this.departmentList = department.results
    // })

    // Taking privilege list
    this.utilityConfigService.getPrivilegesList().subscribe(privilege => {
      this.privilegeList = privilege.results
    });

    this.utilityConfigService.getUtilityModuleSubModuleList().subscribe(list => {
      console.log("LIST RESULTS",list.results)
      this.moduleSubModuleList = list.results
    });

    const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing:false,
      //   dom: 'Bfrtip',
      //   buttons: [
      //     'copy', 'csv', 'excel', 'print'
      // ],
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
          
          that.apiService.get(`role/utility/${that.utilityIdString}/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.dataSet = resp.results;

              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
        },
      };

  }

  onSearch(e){
    this.roles = this.roleList.filter(item => item.role.toLowerCase().includes(e.toLowerCase()))
  }


  getSubModule(event) {
    this.utilityConfigService.getRoleSubTypeList(event.id_string).subscribe(rolesSubType => {
      this.roleSubType = rolesSubType.results
    })
  }

  submoduleList1;
  submoduleList;
  module;
  searchText;

  showtoast = false;
  showexceptiontoast = false;
  // Get deta after select privilages
  roleObj: any = {};
  data = []

  onChange(event, index, subModule, module_id, subModuleList?) {
    this.roleObj['utility_id'] = this.sessionService.getter("utility_id_string_admin")
    this.roleObj['data'] = this.roleObj['data'] || []
    var dummyArr = _.filter(subModuleList, function (ele) {

      ele['module_id'] = module_id
      ele['sub_module'] = [{
        sub_module_id: ele.id_string,
        privilege_id: ele.privilege
      }]
      return ele.privilege
    })
    var ifFound = true
    var that = this;
    let array1 = that.roleObj['data']
    let array2 = dummyArr
    that.roleObj['data'] = array1.concat(array2);
    that.roleObj['data'] = [...new Set([...array1, ...array2])]
    subModuleList[index].privilege = subModuleList[index].privilege
  }

  // On click the role submit
  submitValidate = false
  roleDetailsList;
  hideModal:boolean = false
  dept;
  showTable: boolean = true;
  moduleToast:boolean=false;
  selectedValue: any;
  onPannelToggleClick(){
    console.log("Cbdkcd",)
  }
  onAddRoleSubmit() {
    console.log("ACTIVE",this.activeIds)
    // if(this.activeIds.length == 0){
    //   this.moduleToast = true;

    // }
    
    this.hideModal = false
    this.submitValidate = true
    this.applicantDetailsFormSubmitted = true;
   
    let data ={
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      role: this.applicantDetailsForm.value.roleNameControl,
      type_id: this.applicantDetailsForm.value.roleTypeControl.id_string,
      sub_type_id: this.applicantDetailsForm.value.roleSubTypeControl.id_string,
    }


    // if (this.roleObj.data) {
    //   for (let a of this.roleObj.data) {
    //     delete a.id_string
    //     delete a.privilege
    //   }
    // }
    if (this.applicantDetailsForm.invalid) {
      return;
    }
    else{
      this.utilityConfigService.addRole(data).subscribe(result => {
        console.log('result: role add', this.roleObj);
        if (result.state == 'success') {
          this.utilityConfigService.addRolePrivileges(result.results.id_string, this.roleObj).subscribe(result => {
            console.log('result: privileges add  ', result);
            this.addedSuccessfullyToast = true
            this.showTable = false;
            setTimeout(()=>{
              this.showTable = true;
            }, 0);
            $("#addRole_Role_Modal").modal('hide')
            // this.utilityConfigService.getRoleListByutility().subscribe(data => {
            //   // for(let item of data['results']){
            //   //   this.roles.push(item)
            //   //   this.roleList.push(item)
            //   // }
            //   this.roles = data.results
            // })
            this.applicantDetailsForm.reset();
            this.activeIds = [];
            this.applicantDetailsFormSubmitted = false;
          })
        } else if (result.state == "exception") {
          this.exceptionToast=true;
        }
      },(err)=>{
        this.exceptionToast=true;
        
        
      })

    }

    
  }


  getRoleDetails(item) {

    this.utilityConfigService.getRoleDetails(item).subscribe(roleDetails => {
      this.roleDetailsList = roleDetails.results
      console.log('roleDetails: ', this.roleDetailsList);

    })
  }


}
