import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperFormService } from '../../common/stepper-form/stepper-form.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray , AbstractControl } from '@angular/forms';
import { UtilityConfigurationService } from 'src/app/admin/utility-configuration/utility-configuration.service';
import { CommonService } from 'src/app/common/common.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { UserService } from '../user.service';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import * as _ from 'underscore';
import * as lodash from 'lodash';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../error-messages/error-messages';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers:[ErrorMessage]
})
export class UserAddComponent implements OnInit {

  faTrash = faTrash;

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Stepper data start
  blocks = [
    {
      name: 'User details',
      id: 'user-dtls-tab',
      href: '#user-dtls',
      class: 'nav-link active',
      areaControl: 'user-dtls',
      listClass: 'nav-item list-group-item active'
    },
    {
      name: 'User Configuration',
      id: 'user-privillages-tab',
      href: '#user-privillages',
      class: 'nav-link',
      areaControl: 'user-privillages',
      listClass: 'nav-item list-group-item'
    },
    {
      name: 'Review & Submit',
      id: 'user-rvw-sbmt-tab',
      href: '#user-rvw-sbmt',
      class: 'nav-link',
      areaControl: 'user-rvw-sbmt',
      listClass: 'nav-item list-group-item'
    }
  ]
  emailPattern;
  constructor(private stepperFormService: StepperFormService, private formBuilder: FormBuilder,
    private utilityConfigService: UtilityConfigurationService, private commonService: CommonService,
    private sessionService: SessionService, private userService: UserService, private apiService: ApiService,
    private router: Router) {


    this.userDetailsForm = this.formBuilder.group({
      firstNameControl: [null, [Validators.required,Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator,Validators.maxLength(20)]],
      middleNameControl: [null,[Validators.required,Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator,Validators.maxLength(20)]],
      lastNameControl: [null, [Validators.required,Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator,Validators.maxLength(20)]],
      mobileNoControl: [null, [Validators.required]],
      emailControl: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      addressControl: [null,],

    });

    this.privilageDetailsForm = this.formBuilder.group({
      utilityControl: [null, [Validators.required]],
      roleTypeControl: [null, [Validators.required]],
      roleSubTypeControl: [null, [Validators.required]],
      // departmentControl: [null,],
      formFactorControl: [null, [Validators.required]],
      vendorControl: [null,],
      utilityDivControl: this.formBuilder.array([]),
      roleDivControl: this.formBuilder.array([]),
      roleControl: [null,[Validators.required]],
      cityControl: [null,],
      skillControl: [null,],
      areaControl: [null,],
    });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  // User details form control start
  get ud() { return this.userDetailsForm.controls; }
  // User details form control end

  // prililage details form control start
  get pd() { return this.privilageDetailsForm.controls; }
  // prililage details form control end



  // Forms build start
  userDetailsForm: FormGroup;
  userDetailsFormSubmitted = false;
  bankDetailsForm: FormGroup;
  bankDetailsFormSubmitted = false;
  documentDetailsForm: FormGroup;
  documentDetailsFormSubmitted = false;
  privilageDetailsForm: FormGroup;
  privilageDetailsFormSubmitted = false;
  // Forms build end


  // User details form submit start
  onUserDetailsFormSubmit() {
    this.userDetailsFormSubmitted = true;
    if (this.userDetailsForm.invalid) {
      console.log(this.ud)
      return;
      
    } else {
      this.stepperFormService.sendTrigger("#user-privillages-tab")
    }
  }
  // User details form submit end



  // Privilages details form submit start
  onPrivilageDetailsFormSubmit() {
    this.privilageDetailsFormSubmitted = true;
    if (this.privilageDetailsForm.invalid) {
      console.log(this.pd)
      return;
    } else {
      this.stepperFormService.sendTrigger("#user-rvw-sbmt-tab")
    }
  }
  // Privilages details form submit end 

  roleTypeList: any = [];
  roleSubType;
  formFactorList;
  roleDataSet;
  departmentLists = [];
  departmentList;
  utilityList;
  vendorList;
  ngOnInit(): void {
    this.sendStepperFormData()
    console.log(this.ud)
   
    // Taking the Role list view data
    this.utilityConfigService.getRoleList().subscribe(roles => {
      this.roleDataSet = roles.results
    }, (error) => {
      this.roleDataSet = ""
    })

    //Taking Role type list
    this.utilityConfigService.getRoleTypeList().subscribe(rolesType => {
      for (let item of rolesType.results) {
        this.roleTypeList.push(item)
      }
    })
    // Taking the formFactor List
    this.utilityConfigService.getFormFactorList().subscribe(formFactor => {
      this.formFactorList = formFactor.results
    })


  }
  utilityLists;
  loginUser;
  utilityListVal = []
  showVendorDropDown: boolean = false
  showUtilityAddButton: boolean = false
  showUtilityDropdown: boolean = true
  showCityDropdown = false
  showAreaDropdown = false
  showSkillDropdown = false

  // Onchange of role type get subtype
  getRoleType(event) {
    this.removePrivilegeRow(null, true)
    this.removeTransactionRow(null, true)
    this.privilageDetailsForm.patchValue({
      roleSubTypeControl: "",
      formFactorControl: "",
      vendorControl: "",
      utilityControl: "",
      roleControl: ""
    })
    if (event.key == "TENANT") {
      this.showUtilityAddButton = true
      this.showUtilityDropdown = false
    } else if (event.key == "UTILITY") {
      this.showUtilityAddButton = false
      this.showUtilityDropdown = true
      this.showVendorDropDown = false
      this.showCityDropdown = false
      this.showAreaDropdown = false
      this.showSkillDropdown = false
    }
    // this.privilageDetailsForm.reset()
    // get Role sub Type by selecting type
    this.utilityConfigService.getRoleSubTypeList(event.id_string).subscribe(rolesSubType => {
      this.roleSubType = rolesSubType.results
    });

    
    
      this.userService.getUtilityListByTenantIdString().subscribe(utility => {
        this.utilityLists = utility.results
        console.log("TENANAT LOGIN",this.utilityLists)
      })
  }

  type_id_string;
  subType_id_string;
  roleList;
  role: any = this.sessionService.getter("Role")
  //According to type & sub type get role, vandor and utility list
  getRoleList(event) {
    this.roleList = []
    this.departmentLists = []
    if (event.key == "VENDOR") {
      this.showVendorDropDown = true
      this.showCityDropdown = true
      this.showAreaDropdown = true
      this.showSkillDropdown = true
      this.userService.getVendorListByUtility().subscribe(vendor => {
        this.vendorList = vendor.results
      })
      if (this.role == "Admin") {
        this.userService.getUserUtilityList().subscribe(utility => {
          for (let utilit of utility.results) {

            if (!this.utilityListVal.some((item) => item.id_string == event.id_string)) {
              this.utilityListVal.push({
                id_string: utilit.utility.id_string,
                name: utilit.utility.name
              })
            }
          }
          this.utilityLists = lodash.uniqBy(this.utilityListVal, function (e) {
            return e.id_string;
          });

        })
      } 
      // else {
      //   this.userService.getUtilityListByTenantIdString().subscribe(utility => {
      //     this.utilityLists = utility.results
      //   })
      // }

    } else if (event.key == "EMPLOYEE") {
      this.showVendorDropDown = false
      this.showCityDropdown = false
      this.showAreaDropdown = false
      this.showSkillDropdown = false
      // this.userService.getUtilityListByTenantIdString().subscribe(utility => {
      //   this.utilityLists = utility.results
      // })
    }
    this.type_id_string = this.privilageDetailsForm.value.roleTypeControl.id_string
    this.subType_id_string = this.privilageDetailsForm.value.roleSubTypeControl.id_string
    if (this.type_id_string && this.subType_id_string) {
      this.userService.getRoleListByTypeSubType(this.type_id_string, this.subType_id_string).subscribe(role => {
        this.roleList = role.results
      })
    }
  }

  get Utilitys() {
    return this.privilageDetailsForm.get('utilityDivControl') as FormArray;
  }

  get Roles() {
    return this.privilageDetailsForm.get('roleDivControl') as FormArray;
  }

  // After select utility show the utility carts
  obj;
  cityLists = [];
  cityList;
  areaList;
  areaLists = []
  skillsList;
  skillsLists = []

  // Add single utility then display the cart
  displayCart(event) {
    console.log("EVENT",event)
    if (event != undefined && this.Utilitys.length <= 0) {
      if (!this.Utilitys.value.some((item) => item.utilityControl.name == event.name)) {
        this.Utilitys.push(this.formBuilder.group({ utilityControl: event }));
      }
    }
    if(this.privilageDetailsForm.value.roleTypeControl == 'Tenant'){
      this.obj = event.utility.id_string
    }
    else{
      this.obj = event.id_string
    }
    
    this.userService.getCity(this.obj).subscribe(citys => {
      console.log('citys: ', citys.results);
      for (let city of citys.results) {
        this.cityLists.push({ name: city.name, id_string: city.id_string })
      }
      this.cityList = this.cityLists
    })

    this.userService.getArea(this.obj).subscribe(areas => {
      for (let area of areas.results) {
        this.areaLists.push({ name: area.name, id_string: area.id_string })
      }
      this.areaList = this.areaLists
    })
    this.userService.getSkills(this.obj).subscribe(skills => {
      for (let skill of skills.results) {
        this.skillsLists.push({ skill: skill.skill, id_string: skill.id_string })
      }
      this.skillsList = this.skillsLists
    })
  }

  event;
  utilityIdStringList = []
  // Add multiple utilities then display carts
  selectUtility() {
    this.event = this.privilageDetailsForm.value.utilityControl
    if (this.event != undefined) {
      if (!this.Utilitys.value.some((item) => item.utilityControl.name == this.event.name)) {
        this.Utilitys.push(this.formBuilder.group({ utilityControl: this.event }));
      }
      this.utilityIdStringList.push(this.event.id_string)
    }
    for (let val of this.utilityIdStringList) {
      this.userService.getCity(val).subscribe(citys => {
        console.log('citys: ', citys);
        for (let city of citys.results) {
          if (!this.cityLists.some((item) => item.id_string == city.id_string)) {
            this.cityLists.push({ name: city.name, id_string: city.id_string })
          }
        }
        this.cityList = this.cityLists

      })
      this.userService.getArea(val).subscribe(areas => {
        for (let area of areas.results) {
          if (!this.areaLists.some((item) => item.id_string == area.id_string)) {
            this.areaLists.push({ name: area.name, id_string: area.id_string })
          }
        }
        this.areaList = this.areaLists
      })
      this.userService.getSkills(val).subscribe(skills => {
        for (let skill of skills.results) {
          if (!this.skillsLists.some((item) => item.id_string == skill.id_string)) {
            this.skillsLists.push({ skill: skill.skill, id_string: skill.id_string })
          }
        }
        this.skillsList = this.skillsLists
      })
    }
  }

  // remove utilities
  removeTransactionRow(index?, removeAll?) {
    if (removeAll) {
      this.resetFormArray()
    } else {
      if (index != -1) {
        this.Utilitys.removeAt(index);
      } else {
        return false
      }
    }
  }


  resetFormArray() {
    _.each(this.Utilitys.controls, (contol, i) => {
      this.Utilitys.removeAt(i);
    })
    _.each(this.Roles.controls, (contol, i) => {
      this.Roles.removeAt(i);
      this.Utilitys.removeAt(i);
    })
  }

  // remove roles
  removePrivilegeRow(index?, removeAll?) {
    if (removeAll) {
      this.resetFormArray()

    } else {

      if (index != -1) {
        this.Roles.removeAt(index);

      } else {
        return false
      }

    }
  }
  roleCartDetail;
  moduleData;
  getRoleCartData(event) {
    if (event != undefined) {
      this.userService.getModuleSubModuleByRole(event.id_string).subscribe(moduleList => {
        this.moduleData = moduleList.results
        if (!this.Roles.value.some((item) => item.roleControl.role == event.role)) {
          this.Roles.push(this.formBuilder.group({ roleControl: this.moduleData }));
        }
      });
    }
  }


  sendStepperFormData() {
    this.stepperFormService.stepperFormEvent.emit(this.blocks);
  }

  onPrivilegeCancelClick(){
   this.stepperFormService.sendTrigger('#user-dtls-tab')
  }

  onReviewCancelClick(){
    this.stepperFormService.sendTrigger('#user-privillages-tab')
  }

  testing() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      e.target // newly activated tab
      $('a[data-toggle="tab"]').parent(".list-group-item").removeClass("active").removeClass("finished");
    })
    $('#user-dtls-tab').on('shown.bs.tab', function (e) {
      e.target // newly activated tab               
      $(this).parent(".list-group-item").addClass("active");
    });

    $('#user-privillages-tab').on('shown.bs.tab', function (e) {
      e.target // newly activated tab
      // alert('working4');
      $('#user-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");
      $(this).parent(".list-group-item").addClass("active");
    });

    $('#user-rvw-sbmt-tab').on('shown.bs.tab', function (e) {
      e.target // newly activated tab
      // alert('working4');
      $('#user-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");
      $('#user-privillages-tab').parent(".list-group-item").removeClass("active").addClass("finished");
      $(this).parent(".list-group-item").addClass("active");
    });

    // $("#proceed_1").on('click', function () {
    // });
    // $("#proceed_2").on('click', function () {
    //   // $('#user-docs-tab').trigger( "click" );
    // });
    // $("#proceed_3").on('click', function () {
    //   // $('#user-privillages-tab').trigger( "click" );
    // });
    // $("#proceed_4").on('click', function () {
    //   // $('#user-rvw-sbmt-tab').trigger( "click" );
    // });
    // $("#proceed_5").on('click', function () {
    //   console.log("end-of-form");
    // });
  }

  showtoast = false;
  showexceptiontoast = false;
  roles = []
  utilities = []
  utility = []
  areaVal;
  cityVal;
  skillVal;
  formFactorVal; departVal;
  middleName;
  userTypeVal; userSubTypeVal;
  dataInvalidMsg: boolean = false;
  skills = [];
  userIDgenerationToast = false;
  allFieldstoast = false;
  privilegeDetailsToast = false;
  userDetailsToast = false;
  userDetailPrivilegeDetailToast = false;
  vendorVal;
  areas = []
  onUserSubmit() {
    // create request for add role
    for (let a of this.privilageDetailsForm.value.roleDivControl) {
      this.roles.push({
        "role_id_string": a.roleControl.id_string,
        "utility_id_string":this.sessionService.getter("utility_id_string_admin")
  
      })
    }

    var data = this.roles
    var groups = _.chain(data)
      // Group the elements of Array based on `utility_id` property
      .groupBy("utility_id")
      // `key` is group's name (utility_id), `value` is the array of objects
      .map((value, key) => ({ utility_id: key, roles: value }))
      .value()

    // create request for add utility
    for (let utility of this.privilageDetailsForm.value.utilityDivControl) {
      this.utility.push({
        utility_id_string: utility.utilityControl.id_string
      });
    }
    if (this.userDetailsForm.value.middleNameControl != null) {
      this.middleName = this.userDetailsForm.value.middleNameControl
    } else {
      this.middleName = ''
    }

    if (this.privilageDetailsForm.value.roleTypeControl != null) {
      this.userTypeVal = this.privilageDetailsForm.value.roleTypeControl.id_string
    }
    if (this.privilageDetailsForm.value.roleSubTypeControl != null) {
      this.userSubTypeVal = this.privilageDetailsForm.value.roleSubTypeControl.id_string
    }
    if (this.privilageDetailsForm.value.formFactorControl != null) {
      this.formFactorVal = this.privilageDetailsForm.value.formFactorControl.id_string
    }
    // if (this.privilageDetailsForm.value.departmentControl != null) {
    //   this.departVal = this.privilageDetailsForm.value.departmentControl.id_string
    // }
    if (this.privilageDetailsForm.value.areaControl != null) {
      for (let area_details of this.privilageDetailsForm.value.areaControl){
        
        this.areas.push(
          {
            area_id_string:area_details.id_string,
          }
        );
      }
    }
    if (this.privilageDetailsForm.value.cityControl != null) {
      this.cityVal = this.privilageDetailsForm.value.cityControl.id_string
    }
    if (this.privilageDetailsForm.value.vendorControl != null) {
      this.vendorVal = this.privilageDetailsForm.value.vendorControl.id_string
    }
    if (this.privilageDetailsForm.value.skillControl != null) {
      for (let skill_details of this.privilageDetailsForm.value.skillControl){
        this.skills.push(
          {
            skill_id_string:skill_details.id_string,
          }
        );
      }
    }

    // query set for add user
    let userDetails = {
      user_type_id: this.userTypeVal,
      user_subtype_id: this.userSubTypeVal,
      form_factor_id: this.formFactorVal,
      department_id: this.departVal,
      supplier_id: this.vendorVal,
      first_name: this.userDetailsForm.value.firstNameControl,
      middle_name: this.middleName,
      last_name: this.userDetailsForm.value.lastNameControl,
      phone_mobile: this.userDetailsForm.value.mobileNoControl,
      email: this.userDetailsForm.value.emailControl,
      password: "admin",
      address: this.userDetailsForm.value.addressControl,
      city_id: this.cityVal,
      area: this.areaVal,
    }
    console.log('userDetails: ', userDetails);
    if (this.userDetailsForm.invalid) {
      this.userDetailsFormSubmitted = true;
      this.userDetailsToast = true;
      this.stepperFormService.sendTrigger('#user-dtls-tab')
      return;
    }
    else if(this.privilageDetailsForm.invalid){
      this.privilageDetailsFormSubmitted = true;
      this.privilegeDetailsToast = true;
      this.stepperFormService.sendTrigger("#user-privillages-tab")
      return;
    }
    else if(this.userDetailsForm.invalid && this.privilageDetailsForm.invalid){
      this.userDetailPrivilegeDetailToast = true;
      this.stepperFormService.sendTrigger('#user-dtls-tab')
      return;
    }
    else{
      this.userService.addUser(userDetails).subscribe(result => {
        this.userDetailsFormSubmitted = true;
        this.privilageDetailsFormSubmitted = true;
        console.log("Errors",this.ud)
        if (result.state == "success") {
          console.log('result: ', result);
          this.showtoast = true;

          this.userService.addRole(result.results.id_string, this.roles).subscribe(role => {
            console.log('===========Roles', this.roles)
          })
          this.userService.addUtility(result.results.id_string, this.utility).subscribe(utility => {
            console.log('utility: ============', utility);

          })
          this.userService.addUserSkills(result.results.id_string, this.skills).subscribe(result => {
            console.log('result: Skill added', result);
          })
          this.userService.addUserArea(result.results.id_string, this.areas).subscribe(result => {
            console.log('result: Area added', result);
          })
          setTimeout(() => {
          this.router.navigateByUrl('/user');
          }, 3000);
          
        } 
      },
        (err) => {
          if(err.error.result == 'User ID generation failed'){
            this.userIDgenerationToast = true;
          }
          else if(err.error.result == 'undefined'){
            this.allFieldstoast = true;
          }
          else{
            this.showexceptiontoast = true;
          }

        })
    }
 }

  activeIds: string[] = [];
  panels = [0, 1, 2, 3]
  openAll(acc?, index?) {
    this.activeIds = this.panels.map(p => "panel-" + p);
  }
}