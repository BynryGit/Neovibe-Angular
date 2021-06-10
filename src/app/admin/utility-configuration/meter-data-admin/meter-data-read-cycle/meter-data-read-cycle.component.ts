import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-meter-data-read-cycle',
  templateUrl: './meter-data-read-cycle.component.html',
  styleUrls: ['./meter-data-read-cycle.component.scss'],
  providers: [ErrorMessage]
})
export class MeterDataReadCycleComponent implements OnInit {

  @ViewChild('ngSelectComponent') ngSelectComponent: NgSelectComponent;
  constructor(private filterService : FilterService,private formBuilder: FormBuilder, private apiService : ApiService,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
      $('#table2').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
      $('#table2').DataTable().search(data.text).draw()
    })

      // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    cityNameControl: [null, [Validators.required]],
    areaNameControl: [null, [Validators.required]],
    zoneNameControl: [null, [Validators.required]],
    divisionNameControl: [null, [Validators.required]],
    subareaNameControl:[null, [Validators.required]],
    readCycleNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
    categoryNameControl:[null, [Validators.required]],
    productNameControl:[null, [Validators.required]],
    meterTypeControl:[null, [Validators.required]],
  });

    // premise details form code start
    this.premiseDetailsForm = this.formBuilder.group({
      premiseTypeControl: this.formBuilder.array(
        [this.formBuilder.group({premise_name:[null]})]
        ),
    });
    // premise details form code en

    this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
      this.cityList = data;
     
    })

    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.productList = data;
     
    })

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.categoryList = data;
     
    })

    this.apiService.get('meter-data/utility/'+this.utilityIdString+'/read_cycle/list').subscribe(data => {
      this.read_cycleList = data;
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
   read_cycleList:any=[];
   subareaList:any=[];
   routeList:any=[];
   productList:any=[];
   applicantDetailsForm: FormGroup;
   applicantDetailsFormSubmitted = false;
   applicantDetailsFormEdit: FormGroup;
   applicantDetailsFormEditSubmitted = false;
   addedSuccessfullyToast = false;
   editedSuccessfullyToast = false;
   exceptionToast = false;
   filterDetailsFormSubmitted = false;
   selectDropdown;
   disableAdd:boolean = false;
   repeatRouteToast = false;

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
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
    this.zoneList=[];
    this.areaList = [];
    this.countryList=[];
    this.stateList=[];
    this.divisionList=[];
    this.subareaList=[];
     
   }
 
   onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
    this.zoneList=[];
    this.areaList = [];
    this.countryList=[];
    this.stateList=[];
    this.divisionList=[];
    this.subareaList=[];
     
   }
 
   onFilterClearClick(){
    this.filterDetailsFormSubmitted = false;
     this.ad.cityNameControl.errors.required = false;
     this.ad.zoneNameControl.errors.required = false;
     this.ad.divisionNameControl.errors.required = false;
     this.ad.areaNameControl.errors.required = false;
     this.ad.subareaNameControl.errors.required = false;
     
 
   // Call to clear
  //  this.ngSelectComponent.handleClearClick;

    //  this.selectDropdown.handleClearClick()
 
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  searchText;

  blocks1 = [
    {
       name:       "Routes",
    }

]

blocks = [
  {
    name:"Read Cycle Name",
  },
  {
    name:"Subarea",
  },
  {
     name:       "Created by",
  },
  {
    name:       "Created date",
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
premiseConstant:any=[];
read_cycleObj:any=[];
meter_typeList:any=[];
cityChange(){
  let city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string;
  // Zones dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/zone/list?city_id='+city_id_string).subscribe(data=>{
    this.zoneList = data;
  })
  // Zone categories dropdown api call end
}

zoneChange(){
  let zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string;
  // Division dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/division/list?zone_id='+zone_id_string).subscribe(data=>{
    this.divisionList = data;
  })
  // Division dropdown api call end
}

divisionChange(){
  let division_id_string = this.applicantDetailsForm.value.divisionNameControl.id_string;
  // Area dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/area/list?division_id='+division_id_string).subscribe(data=>{
    this.areaList = data;
  })
  // Area dropdown api call end

}

areaChange(){
  let area_id_string = this.applicantDetailsForm.value.areaNameControl.id_string;
  // Subarea dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/subarea/list?area_id='+area_id_string).subscribe(data=>{
    this.subareaList = data;
  })
  // Subarea dropdown api call end

}


subareaChange(){
  let subarea_id_string = this.applicantDetailsForm.value.subareaNameControl.id_string
  // Premise table api call start
  this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/short_list?subarea_id='+subarea_id_string).subscribe(data=>{
    this.routeList = data;
    
  })
  // Subarea table api call end
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
  // this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/short_list?city_id='+city_id_string).subscribe(data=>{
  //   this.routeList = data;
    
  // })
}
  // Premise Citywise table api call end

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
  // this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/short_list?city_id='+city_id_string+'&zone_id='+zone_id_string).subscribe(data=>{
  //   this.routeList = data;
    
  // })
  // Premise City and Zone wise api call end
  }

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) && (division_id_string=this.applicantDetailsForm.value.divisionNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
  // this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/short_list?city_id='+city_id_string+'&zone_id='+zone_id_string+'&division_id='+division_id_string).subscribe(data=>{
  //   this.routeList = data;
    
  // })
  // Premise City and Zone wise api call end
  }

  if ((city_id_string = this.applicantDetailsForm.value.cityNameControl.id_string) && (zone_id_string = this.applicantDetailsForm.value.zoneNameControl.id_string) && (division_id_string=this.applicantDetailsForm.value.divisionNameControl.id_string) && (area_id_string=this.applicantDetailsForm.value.areaNameControl.id_string) != '')
  {
     // Premise City and Zone wise api call start
  // this.apiService.get('meter-data/utility/'+this.utilityIdString+'/route/short_list?city_id='+city_id_string+'&zone_id='+zone_id_string+'&division_id='+division_id_string+'&area_id='+area_id_string).subscribe(data=>{
  //   this.routeList = data;
    
  // })
  // Premise City and Zone wise api call end
  }
  


}
check;
isChecked = false;
  lastSelected;
  checkuncheckall(event)
  {
    for(let i in this.dataSet1){
      
    }
  
}

service_details_list = [];
  setLastClicked(item,event) {
    this.lastSelected = item;
    console.log("LAST",this.lastSelected)
    if( event.checked == true){
      this.service_details_list.push(
        {
          id_string:item.id_string,
          value: item.name
        }
      );
    }
  }

addReadCycleData;
read_cycle_data:any=[];


showTable: boolean = true;
onAddReadCycle(){
  console.log("ROUTE",this.routeList)
  this.read_cycle_data = this.routeList.results
  this.applicantDetailsFormSubmitted = true;
  let data ={
    name:this.applicantDetailsForm.value.readCycleNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    utility_product_id:this.applicantDetailsForm.value.productNameControl.id_string,
    city_id:this.applicantDetailsForm.value.cityNameControl.id_string,
    zone_id:this.applicantDetailsForm.value.zoneNameControl.id_string,
    division_id:this.applicantDetailsForm.value.divisionNameControl.id_string,
    area_id:this.applicantDetailsForm.value.areaNameControl.id_string,
    subarea_id:this.applicantDetailsForm.value.subareaNameControl.id_string,
    route_json:this.service_details_list
  }

  this.disableAdd = true;

  if (this.applicantDetailsForm.invalid) {
    this.disableAdd = false;
    return;
  }else{
    this.apiService.post('meter-data/'+this.utilityIdString+'/read_cycle',data).subscribe(result=>{
      if(result.state == 'success'){
        this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#add_read_cycle').modal('hide');
        this.disableAdd = false;
        this.applicantDetailsForm.reset();
        this.filterDetailsFormSubmitted = false;
        this.applicantDetailsFormSubmitted = false;
        this.zoneList=[];
        this.areaList = [];
        this.countryList=[];
        this.stateList=[];
        this.divisionList=[];
        this.subareaList=[];
      }
    },(err) => {
      this.disableAdd = false;
      if(err.error.results == 'CANNOT_ENTER_DUPLICATE_ROUTES'){
        this.repeatRouteToast = true
        this.disableAdd = false;
      }
      if(err.error.results == 'Route Already Exist'){
        this.exceptionToast=true;
        this.disableAdd = false;
      }
    });
  }
  
}


dataSet = [

]

dataSet1 = [

]

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
        
        that.apiService.get(`meter-data/utility/${that.utilityIdString}/read_cycle/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
        
        that.apiService.get(`meter-data/utility/${that.utilityIdString}/route/short_list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
