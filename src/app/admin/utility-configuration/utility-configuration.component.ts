import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UtilityConfigurationService } from './utility-configuration.service';
import { ApiService } from '../../common-services/api-service/api.service';
import * as _ from 'underscore';
import * as lodash from 'lodash';
import { UtilityService } from '../,,/../../utility/utility.service';
import { FilterService } from '../../common/filter/filter.service';
import { any, result, sample } from 'underscore';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-utility-configuration',
  templateUrl: './utility-configuration.component.html',
  styleUrls: ['./utility-configuration.component.scss']
})
export class UtilityConfigurationComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;
  date: { year: number, month: number };
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
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

  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedDepartment: any = "";
  department = [
    { id: 1, name: 'Utility Setup' },
    { id: 2, name: 'Utility Holiday' },
    { id: 3, name: 'Territory' },
    { id: 4, name: 'Num Format' },
    { id: 5, name: 'Documents' },
    { id: 6, name: 'Role' },
    { id: 7, name: 'User' },
    { id: 8, name: 'Campaign' },
    { id: 9, name: 'Survey' },
    { id: 10, name: 'Registration' },
    { id: 11, name: 'Consumers' },
    { id: 12, name: 'Meter Data' },
    { id: 13, name: 'Billing' },
    { id: 14, name: 'Payments' },
    // { id: 15, name: 'Services' },
    { id: 15, name: 'Complaints' },
    { id: 16, name: 'Notifications' },
    { id: 17, name: 'Offers' },
    { id: 18, name: 'Integration and Key'},
    { id: 19, name: 'Templates'},
    { id: 20, name: 'Activity Log'}
  ];

  selectedDepartment1: any = "";
  department1 = [
    { id: 1, name1: 'Work Orders' },
    { id: 2, name1: 'Contracts' },
    { id: 3, name1: 'Suppliers' },
    { id: 4, name1: 'Store' },
    { id: 5, name1: 'Asset' },
  ];

  selectedDepartment2: any = "";
  department2 = [
    { id: 1, name2: 'Products' },
    { id: 2, name2: 'Services' },
    { id: 3, name2: 'Tenders' },
    { id: 4, name2: 'Orders' },
    { id: 5, name2: 'HCM' },
    { id: 6, name2: 'Finance' },
  ];

  selectedCompany: any
  company = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' }
  ]

  selectFilterStatus: any
  filterStatus = [
    { id: 1, name: 'status 1' },
    { id: 2, name: 'status 2' },
    { id: 3, name: 'status 3' }

  ]

  selectFilterDepartment: any
  filterDepartment = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Billing' }

  ]

  selectedsubtype: any
  subtype = [
    { id: 1, name: 'Type 1' },
    { id: 2, name: 'Type 2' },
  ];

  activated = ""
  isactive = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
  ];

  selectedStatus: any = "";
  status = [
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Advance' },
    { id: 3, name: 'Enterprise' }
  ];

  selectedPagination: any;
  pagination = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
  ];

  selectedPayChannel = '';
  payChannel = [
    { id: 1, paychnl: 'Channel 1' },
    { id: 2, paychnl: 'Channel 2' },
    { id: 3, paychnl: 'Channel 3' },
  ];
  selectedPayType = 'Refund';
  payType = [
    { id: 1, paytp: 'Subscription' },
    { id: 2, paytp: 'Refund' },
  ];

  selectedMonth = '';
  month = [
    { id: 1, name: 'Jan' },
    { id: 2, name: 'Feb' },
    { id: 3, name: 'March' },
  ];

  selectedRegion = '';
  region1 = [
    { id: 1, name: 'America' },
    { id: 2, name: 'Asia' },
    { id: 3, name: 'Africa' },
  ];

  selectedCountry = '';
  country1 = [
    { id: 1, name: 'USA' },
  ];

  selectedState = '';
  state1 = [
    { id: 1, name: 'Texas' },
    { id: 2, name: 'Florida' },
    { id: 3, name: 'Michigan' },
  ];

  selectedCity = '';
  city1 = [
    { id: 1, name: 'Houston' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Austin' },
  ];

  selectedSection = '';
  section1 = [
    { id: 1, name: 'Queens' },
    { id: 2, name: 'Brookyn' },
    { id: 3, name: 'Manhatten' },
  ];

  selectedArea = '';
  area1 = [
    { id: 1, name: 'Rossville' },
    { id: 2, name: 'Queens village' },
  ];

  selectedSubArea = '';
  subarea1 = [
    { id: 1, name: 'Murdock' },
    { id: 2, name: 'Jamaica Ave' },
  ];

  formFactor = [
    { id: 1, name: 'Mobile' },
    { id: 2, name: 'Web' },
  ];
  role = [
    { id: 1, name: 'Marketing Manager' },
    { id: 2, name: 'Vendor' },
    { id: 3, name: 'Supervisor' },
  ];
  documentType = [
    { id: 1, name: 'Personal ID' },
    { id: 2, name: 'Address Proof' },
    { id: 3, name: 'Bank Passbook' },
  ];
  utility = [
    { id: 1, name: 'Utility  1' },
    { id: 2, name: 'Utility  2' },
    { id: 3, name: 'Utility  3' },
  ];

  selectedViewRegister: any;
  register = [
    { id: 1, register: 'View' },
    { id: 2, register: 'Edit' },
  ];

  model: NgbDateStruct;
  dtOptions: DataTables.Settings = {};
  dtOptions2 = {}
  collection = { count: 12, data: [] };
  addRoleForm: FormGroup;
  addRoleFormSubmitted = false;
  dataSet;
  utility_view_id_string;
  utility_view_List;
  got_id;
  subscription: Subscription
  name;
  shortname;
  taxid;
  companyid;
  emailid;
  panno;




  

  constructor(private router: Router, private fb: FormBuilder, private utilityConfigService: UtilityConfigurationService,
    private formBuilder: FormBuilder, private sessionService: SessionService,private utilityService:UtilityService,private apiService:ApiService,private filterService : FilterService) {
      // this.utilityService.getUtilityListData().subscribe(utilitydata=>{
      //   this.dataSet = utilitydata.results
      //   console.log('List: ', utilitydata);
      // })

      this.apiService.get('utility/'+ this.utility_id_string_admin +'/document/list').subscribe(data=>{
        this.imageDetailList = data.results
        for(let item of this.imageDetailList){
          var str1 = item.document_generated_name
        }
        this.imageUrl = str1
        console.log("URL",this.imageUrl)
      },(err) => {
        this.imageUrl='../../../assets/images/no-image-available.png';
        this.showButton = true;
      });
      

    
  }



  imageDetailList=[];
  showButton:boolean = false;
  imageUrl;
  buttonUrl
  utility_id_string_admin = this.sessionService.getter("utility_id_string_admin")
  roleDataSet;
  roleTypeList: any[] = [];
  roleSubType;
  formFactorList;
  departmentList;
  privilegeList;
  utilityModule: any = [];
  subModuleList: any = [];
  moduleSubModuleList;roleTypes;roleSubTypes;
  utility_id_string = this.sessionService.getter("utility_id_string_admin")
  ngOnInit(): void {


      if(this.utility_id_string){
        this.apiService.get('utility/'+this.utility_id_string).subscribe(data=>{
          this.name = data.result.name
          this.shortname = data.result.short_name
          this.companyid = data.result.company_id
          this.taxid = data.result.tax_id
          this.emailid = data.result.email_id,
          this.panno = data.result.pan_no
  
          console.log('View Utility List result:',this.name);
        })  

      }
      
    

    this.selectedStatus = this.status[0]
    this.selectedDepartment = this.department[0]
    this.selectedDepartment1 = this.department1[0]
    this.selectedDepartment2 = this.department2[0]
    const roleTypePromise = this.utilityConfigService.getRoleTypeListByUtility().toPromise();
    const roleSubTypePromise = this.utilityConfigService.getRoleSubTypeListByUtility().toPromise();
    // Taking the Role list view data
    this.utilityConfigService.getRoleList().subscribe(roles => {
      this.roleDataSet = roles.results

      roleTypePromise.then(roleType=>{
        this.roleTypes = roleType.results
       })
       roleSubTypePromise.then(roleSubType=>{
        this.roleSubTypes = roleSubType.results
       })
    })
    //Taking Role type list
    this.utilityConfigService.getRoleTypeListByUtility().subscribe(rolesType => {
      for (let item of rolesType.results) {
        this.roleTypeList.push(item)
      }
    })
    // Taking the formFactor List
    this.utilityConfigService.getFormFactorList().subscribe(formFactor => {
      this.formFactorList = formFactor.results
    })

    // // Taking Department list
    // this.utilityConfigService.getDepartmentList().subscribe(department => {
    //   this.departmentList = department.results
    // })

    // Taking privilege list
    this.utilityConfigService.getPrivilegesList().subscribe(privilege => {
      this.privilegeList = privilege.results
    });

    this.utilityConfigService.getUtilityModuleSubModuleList().subscribe(list=>{
      this.moduleSubModuleList = list.results
    });  

  }
  getSubModule(event) {
    this.utilityConfigService.getRoleSubTypeList(event.id_string).subscribe(rolesSubType => {
      this.roleSubType = rolesSubType.results
    })
  }

  submoduleList1;
  submoduleList;
  module;

  showtoast = false;
  showexceptiontoast=false;
  // Get deta after select privilages
  roleObj: any = {};
  data = []

  onChange(event, index, subModule,module_id,subModuleList?) {
    this.roleObj['utility_id']=this.sessionService.getter("utility_id_string")
    this.roleObj['data'] = this.roleObj['data'] || []
    var dummyArr=_.filter(subModuleList, function (ele) {
      
      ele['module_id'] =module_id
      ele['sub_module'] =[{
        sub_module_id:ele.id_string,
        privilege_id:ele.privilege
      }]
     

      return  ele.privilege      
    })
    var ifFound = true
    var that=this;
    let array1 = that.roleObj['data']
    let array2 = dummyArr
    that.roleObj['data'] = array1.concat(array2);
    that.roleObj['data'] = [...new Set([...array1,...array2])]
    subModuleList[index].privilege=subModuleList[index].privilege
  }

  // assignDirectValues(list, ind, index) {
  //   this.roleObj['modules']['module'][ind] = {
  //     "id_string": list[index].module_id.id_string,
  //     "name": list[index].module_id.name,
  //     "sub_module": list[index].submodule
  //   }

  //   console.log('this.roleObj: ', this.roleObj);

  // }

  // On click the role submit
  addRoleData;
  submitValidate = false
  roleDetailsList;
  onAddRoleSubmit(frm) {
    this.submitValidate = true
    this.addRoleData ={
      role:this.roleObj.role,
      type_id:this.roleObj.role_type.id_string,
      sub_type_id:this.roleObj.role_sub_type.id_string,
      form_factor_id:this.roleObj.form_factor.id_string,
      department_id:this.roleObj.department.id_string
    }

    if(this.roleObj.data){
      for(let a of this.roleObj.data){
        delete a.id_string
        delete a.privilege
      }
    }
    // console.log('******************',this.roleObj);
    // this.utilityConfigService.addRolePrivileges("f543991d-0736-4f2c-91ab-399e6af6f724",this.roleObj).subscribe(result=>{
    //   console.log('result: privileges add  ', result);

    // })

    this.utilityConfigService.addRole(this.addRoleData).subscribe(result => {
      console.log('result: role add', result);
      if (result.state === 'success') {
        this.utilityConfigService.addRolePrivileges(result.results.id_string,this.roleObj).subscribe(result=>{
          console.log('result: privileges add  ', result);
          $('#addRole_Role_Modal').addClass('.ng-hide');
          this.showtoast = true
        })
      }else if(result.state == "exception"){
        this.showexceptiontoast = true
      }
    })
  }


  getRoleDetails(item){

    this.utilityConfigService.getRoleDetails(item).subscribe(roleDetails=>{
      this.roleDetailsList = roleDetails.results
      console.log('roleDetails: ', this.roleDetailsList);

    })
  }
}
