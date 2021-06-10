import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
declare var $:any;

@Component({
  selector: 'app-meter-data-admin-route',
  templateUrl: './meter-data-admin-route.component.html',
  styleUrls: ['./meter-data-admin-route.component.scss'],
  providers: [ErrorMessage]
})

export class MeterDataAdminRouteComponent implements OnInit {

  
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  constructor(private filterService : FilterService,private formBuilder: FormBuilder, private apiService : ApiService,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
      $('#table2').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
      $('#table2').DataTable().page.len(data.number).draw()
    })

    // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    cityNameControl: [null, [Validators.required]],
    areaNameControl: [null, [Validators.required]],
    zoneNameControl: [null, [Validators.required]],
    divisionNameControl: [null, [Validators.required]],
    subareaNameControl:[null, [Validators.required]],
    routeNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
    categoryNameControl:[null, [Validators.required]],
    productNameControl:[null, [Validators.required]],
    meterTypeControl:[null, [Validators.required]],
  });

    // // premise details form code start
    // this.premiseDetailsForm = this.formBuilder.group({
    //   premiseTypeControl: this.formBuilder.array(
    //     [this.formBuilder.group({premise_name:[null]})]
    //     ),
    // });
    // // premise details form code en

    this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
      this.cityList = data;
     
    })
    
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.productList = data;
     
    })



    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.categoryList = data;
     
    })

    this.apiService.get('global-lookup/list').subscribe(data => {
      this.meter_typeList = data;
    }) 


   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  isChecked = false;
  lastSelected;
  checkuncheckall(event)
  {
    if(event.checked == true)
    {
    event.checked = false;
    }
    else
    {
    event.checked = true;
    }
  
  }
  service_details_list = [];
  setLastClicked(item,event) {
    this.lastSelected = item;
    if( event.checked == true){
      this.service_details_list.push(
        {
          id_string:item.id_string,
          value: item.name
        }
      );
    }
  }

  dtOptions:any;
  dtOptions1:any;
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  premiseDetailsForm: FormGroup;
  areaList: any =[];
  categoryList: any =[];
  zoneList:any = [];
  countryList:any=[];
  stateList:any=[];
  divisionList:any=[];
  cityList:any=[];
  productList:any=[];
  subareaList:any=[];
  premiseList:any=[];
  routeList:any=[];
  meter_typeList:any=[];
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  filterDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  repeatRouteToast = false;
  disableAdd:boolean = false;

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end
  
  onCancelClick(){
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
    this.applicantDetailsForm.reset();
    this.zoneList=[];
    this.areaList = [];
    this.countryList=[];
    this.stateList=[];
    this.divisionList=[];
    this.subareaList=[];
    this.premiseList=[];
  }

  onCloseClick(){
   this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
    this.applicantDetailsForm.reset();
    this.zoneList=[];
    this.countryList=[];
    this.areaList = [];
    this.stateList=[];
    this.divisionList=[];
    this.subareaList=[];
    this.premiseList=[];
    
    
  }

  onFilterClearClick(){
    this.filterDetailsFormSubmitted = false;
    this.ad.cityNameControl.errors.required = false;
    this.ad.zoneNameControl.errors.required = false;
    this.ad.divisionNameControl.errors.required = false;
    this.ad.areaNameControl.errors.required = false;
    this.ad.subareaNameControl.errors.required = false;
    
  

  // Call to clear
  this.ngSelectComponent.clearModel();

  }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

 

  blocks1 = [
    {
       name:       "Premises",
    },
    {
      name:       "Meter Count",
   }
]

  blocks = [
    {
      name:"Route Name",
    },
    {
        name:       "Created by",
    },
    {
       name:       "Created Date",
    },
    {
       name:       "Action",
    }, 
]


zoneObj: any = {};
cityObj: any = {};
divisionObj: any = {};
areaObj: any = {};
subareaObj: any = {};
premiseObj: any = {};
meterObj:any = {};
categoryObj:any ={};
routeObj:any={};
searchText;
premiseConstant:any=[];
cityChange(){
  let city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string;
  console.log(city_id_string)
  // Zones dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/zone/list?city_id='+city_id_string).subscribe(data=>{
    this.zoneList = data;
    console.log("MMMM",city_id_string)
  })
  // Zone categories dropdown api call end
  this.zoneList = ''
}

zoneChange(){
  let zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string;
  console.log(zone_id_string)
  // Division dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/division/list?zone_id='+zone_id_string).subscribe(data=>{
    this.divisionList = data;
  })
  // Division dropdown api call end
  this.divisionList = ''
}

divisionChange(){
  let division_id_string = this.applicantDetailsForm.value.divisionNameControl.id_string;
  console.log(division_id_string)
  // Area dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/area/list?division_id='+division_id_string).subscribe(data=>{
    this.areaList = data;
  })
  // Area dropdown api call end
  this.areaList = ''

}

areaChange(){
  let area_id_string = this.applicantDetailsForm.value.areaNameControl.id_string;
  console.log(area_id_string)
  // Subarea dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/subarea/list?area_id='+area_id_string).subscribe(data=>{
    this.subareaList = data;
  })
  // Subarea dropdown api call end
  

}


subareaChange(){
  let subarea_id_string = this.applicantDetailsForm.value.subareaNameControl.id_string;
  console.log(subarea_id_string)
  this.sessionService.setter("subarea_id_string",subarea_id_string)
  // Premise table api call start
}



onApplyClick(){
  this.filterDetailsFormSubmitted = true;
  let city_id_string;
  let zone_id_string; 
  let division_id_string;
  let area_id_string;
  // let division_id_string = this.divisionObj.bindvalue.id_string;

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) != '')
  {
     // Premise Citywise api call start
  this.apiService.get('utility/'+this.utilityIdString+'/premise/short_list?city_id='+city_id_string).subscribe(data=>{
    this.premiseList = data;
    
  })
  
}
  // Premise Citywise table api call end

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
  this.apiService.get('utility/'+this.utilityIdString+'/premise/short_list?city_id='+city_id_string+'&zone_id='+zone_id_string).subscribe(data=>{
    this.premiseList = data;
    
  })
  // Premise City and Zone wise api call end
  }

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) && (division_id_string=this.applicantDetailsForm.value.divisionNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
  this.apiService.get('utility/'+this.utilityIdString+'/premise/short_list?city_id='+city_id_string+'&zone_id='+zone_id_string+'&division_id='+division_id_string).subscribe(data=>{
    this.premiseList = data;
    
  })
  // Premise City and Zone wise api call end
  }

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) && (division_id_string=this.applicantDetailsForm.value.divisionNameControl.id_string) && (area_id_string=this.applicantDetailsForm.value.areaNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
     

  
  // Premise City and Zone wise api call end
  }
}

dataSet = [
    
]

dataSet1 = [
    
]



addRouteData;
editRouteData;
route_data:any=[];

showTable: boolean = true;
onAddMeterRoute(){
  this.route_data = this.premiseList.results
  console.log("service details",this.service_details_list)
  this.applicantDetailsFormSubmitted = true;
    let data ={
    name:this.applicantDetailsForm.value.routeNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    utility_product_id:this.applicantDetailsForm.value.productNameControl.id_string,
    premises_json:this.service_details_list,
    filter_json:{
      city_id_string:this.applicantDetailsForm.value.cityNameControl.id_string,
      zone_id_string:this.applicantDetailsForm.value.zoneNameControl.id_string,
      division_id_string:this.applicantDetailsForm.value.divisionNameControl.id_string,
      area_id_string:this.applicantDetailsForm.value.areaNameControl.id_string,
      subarea_id_string:this.applicantDetailsForm.value.subareaNameControl.id_string,
      category_id_string:this.applicantDetailsForm.value.categoryNameControl.id_string,
      meter_type_id_string:this.applicantDetailsForm.value.meterTypeControl.id_string,
    },
  }

  this.disableAdd = true;

  if (this.applicantDetailsForm.invalid) {
    this.disableAdd = false;
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('meter-data/'+this.utilityIdString+'/route',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#add_meter_route').modal('hide');
        this.disableAdd = false;
        this.applicantDetailsForm.reset();
        this.applicantDetailsFormSubmitted = false;
        this.filterDetailsFormSubmitted = false;
        this.zoneList=[];
        this.areaList = [];
        this.countryList=[];
        this.stateList=[];
        this.divisionList=[];
        this.subareaList=[];
        this.premiseList=[];
        // this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/list').subscribe(data=>{
        //   this.routeList = data;
        //   console.log('List: ', this.routeList);
        //   this.addedSuccessfullyToast=true;
        //   $('#add_meter_route').modal('hide');
        //   this.applicantDetailsForm.reset();
        //   $('#table2').DataTable().empty();
        //   this.applicantDetailsFormSubmitted = false;
        // })
      }
    },(err) => {
      this.disableAdd = false;
      console.log(err)
      if(err.error.results == 'CANNOT_ENTER_DUPLICATE_PREMISE'){
        this.repeatRouteToast = true;
        this.disableAdd = false;
      }
      if(err.error.results == 'Route Already Exist'){
        this.disableAdd = false;
        this.exceptionToast=true;
      }
    });
  }
  
}


  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing:true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'csv', 'excel', 'print'
    // ],
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/utility/${that.utilityIdString}/route/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
            console.log("ININININI")
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
  let subarea_session_id_string = this.sessionService.getter("subarea_id_string")
  this.dtOptions1 = {
    
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing:true,
  //   dom: 'Bfrtip',
  //   buttons: [
  //     'copy', 'csv', 'excel', 'print'
  // ],
    ajax: (dataTablesParameters: any, callback) => {
      that.processing = true
      const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
      
      that.apiService.get(`utility/${that.utilityIdString}/premise/short_list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
          that.dataSet1 = resp.results;
          console.log(that.dataSet1)
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

}
