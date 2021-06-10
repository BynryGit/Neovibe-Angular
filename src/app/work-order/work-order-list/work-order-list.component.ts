import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faStarHalf, faStar, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { Feature, WorkOrderService } from '../work-order.service';
import { FilterService } from 'src/app/common/filter/filter.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Subject, Subscription } from 'rxjs';
declare var $: any;
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.scss']
})
export class WorkOrderListComponent implements OnInit {

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
  faStar = faStar;
  faStarHalf = faStarHalf;
  curDate=new Date();

  btnIcon: boolean = false;
  searchText; searchText1;
  subscription: Subscription
  model: NgbDateStruct;
  mapDate: NgbDateStruct;

  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  scrollOptions1 = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  scrollOptions5 = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  // Open add appointment popup start
  triger: any;
  buttonClicked(event) {
    this.triger = $('#addAppointmentModal').modal('show');
  }
  // Open add appointment popup end


  // Get available resource list/ Open the popup start
  openResourceListModel(item) {
    this.resourceListcall = true
    // set val value becouse i want to hide the deassignment error msg
    this.filterService.sendButtonEventByIdString(this.val, item, this.resourceListcall)
  }
  // Get available resource list/ Open the popup end

  dtOptions: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};


  serviceAppointments:any[]= [];
  serviceAppointmentList = [];
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  Date = new Date(); 
  userData;
  constructor(private router: Router, private apiService: ApiService, private sessionService: SessionService,private commonService:CommonService, private workOrderService: WorkOrderService, private modalService: NgbModal, private filterService: FilterService) {
    this.utilityIdString = this.sessionService.getter('utility_id_string')

    let date = JSON.stringify(this.Date)
    date = date.slice(1,11)

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      serverSide: true,

      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;

       this.subscription = that.apiService.get(`work-order/service-appointment/list?exclude_state=7&utility_id_string=${that.utilityIdString}&page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
          that.serviceAppointments = resp.results;
          console.log('that.serviceAppointments: ', that.serviceAppointments);
          that.serviceAppointmentList = resp.results;
          that.dtTrigger.next();
          that.processing = false
          callback({
            recordsTotal: resp.count,
            recordsFiltered: resp.count,
            data: []
          });
        });
        this.currentDateSetCoordinates()
      },
    };

  };

  onSearch(e) {
    this.serviceAppointments = this.serviceAppointmentList.filter(item => item.sa_number.toLowerCase().includes(e.toLowerCase()) || item.work_order_master_id.name.toLowerCase().includes(e.toLowerCase()))
  }

  public show: boolean = false;
  public locations: boolean = true;
  public mapView: boolean = false;
  public buttonName = "Show";
  public iconChange: boolean = false;
  

  toggleBtn() {
    this.show = !this.show;
    this.iconChange = !this.iconChange;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  showLocations() {
    this.locations = !this.locations;
  }

  utilityIdString;coordinateList: any[] = []

  ngOnInit(): void { }
  
  // Show Detail View of Service Appointment start
  resourceListcall: boolean = false
  showDetailModel(serviceIdString) {
    this.resourceListcall = false
    this.val = true
    this.filterService.displayWorkOrderDetailModule(serviceIdString)
  }
  // Show Detail View of Service Appointment end

  hideModal: boolean = false
  hideDetailModel() {
    this.hideModal = false
  }

  // Deassign The service appointment start
  val: boolean = false; deAssignmentMsg: boolean = false; deAssignErrorMsg: boolean = false;
  deAssignAppointment(appointmentIdString) {
    this.resourceListcall = false
    this.val = true
    this.filterService.sendButtonEventByIdString(this.val, appointmentIdString, this.resourceListcall)
  }
  // Deassign The service appointment end


  scheduleList:any[] = []
  selectCheckbox(event){
    if($("#"+event.sa_number).prop('checked')===true){
      this.scheduleList.push(event.id_string)
    }else{
      let index = this.scheduleList.findIndex(ele=>{
        return event.id_string == ele
      })
      if(index > -1){
        this.scheduleList.splice(index,1)
      }
    }
  }

  bulkSchedule(){
    this.resourceListcall = true
    // set val value becouse i want to hide the deassignment error msg
    this.filterService.sendBulkAssignObj(this.val, this.scheduleList, this.resourceListcall)
  }

  showDate;currentDate;finalDate:any = new Date()

  currentDateSetCoordinates(){
    this.showDate = new Date(this.Date)
    let date = JSON.stringify(this.showDate)
    date = date.slice(1,11)    
    this.subscription = this.apiService.get('work-order/service-appointment/list?utility_id_string='+this.utilityIdString+'&date='+ date).subscribe(result=>{
      if(result.results){
        this.coordinateList = this.commonService.setCoordinatesData(result.results)
        this.commonService.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonService.loadMap(this.coordinateList)
    })
  }

  getNextDate(){
    this.currentDate = this.Date.setDate(this.Date.getDate() + 1)
    this.finalDate = this.currentDate
    this.showDate = new Date(this.finalDate)
    let date = JSON.stringify(this.showDate)
    date = date.slice(1,11)
    this.subscription = this.apiService.get('work-order/service-appointment/list?utility_id_string='+this.utilityIdString+'&date='+ date).subscribe(result=>{
      console.log('result:this.serviceAppointments ', result.results);
      if(result.results){
        this.coordinateList = this.commonService.setCoordinatesData(result.results)
        this.commonService.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonService.loadMap(this.coordinateList)
    })
  }

  getPreviousDate(){
    this.currentDate = this.Date.setDate(this.Date.getDate() - 1)
    this.finalDate = this.currentDate
    this.showDate = new Date(this.finalDate)
    let date = JSON.stringify(this.showDate)
    date = date.slice(1,11)
    this.subscription = this.apiService.get('work-order/service-appointment/list?utility_id_string='+this.utilityIdString+'&date='+ date).subscribe(result=>{
      console.log('result:this.serviceAppointments ', result.results);
      if(result.results){
        this.coordinateList = this.commonService.setCoordinatesData(result.results)
        this.commonService.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonService.loadMap(this.coordinateList)
    })
  }

  

}
