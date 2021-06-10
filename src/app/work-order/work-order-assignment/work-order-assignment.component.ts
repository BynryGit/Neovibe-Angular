import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from 'src/app/common/filter/filter.service';
import { Router } from '@angular/router';
declare var $: any;
import * as lodash from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work-order-assignment',
  templateUrl: './work-order-assignment.component.html',
  styleUrls: ['./work-order-assignment.component.scss']
})
export class WorkOrderAssignmentComponent implements OnInit {

  faPlus = faPlus;

  @Input() assigModel;

  dtOptions: DataTables.Settings = {};

  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  public show: boolean = false;
  public buttonName = "Show";
  public iconChange: boolean = false;
  showModalBox: boolean = false;

  toggleBtn() {
    this.show = !this.show;
    this.iconChange = !this.iconChange;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  hideModel() {
    this.showModalBox = false
  }

  users = [];
  userList = [];
  assignDetail; assignDetailsObj: any;
  dtTrigger: Subject<any> = new Subject<any>();
  processing;

  utilityIdString = this.sessionService.getter('utility_id_string')
  constructor(private apiService: ApiService, private sessionService: SessionService, private filterService: FilterService,
    private router: Router) { }

  ngOnInit(): void {
    this.deAssignAppointment();

    this.filterService.getButtonEventByIdString().subscribe(data => {
      
      // i have used the akshay's method 'getButtonEventByIdString', so use 'privilege' as a keyword for call the resource api
      if (data.privilege == true) {
        this.showModalBox = true
        this.assignDetailsObj = data.id_string

        const that = this;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          serverSide: true,

          ajax: (dataTablesParameters: any, callback) => {
            that.processing = true
            const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;

            that.apiService.get(`user/utility/${that.utilityIdString}/appointment/${that.assignDetailsObj.id_string}/resource/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.users = resp.results;
              that.userList = resp.results;
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
    });
  }

 


  onSearch(e) {
    this.users = this.userList.filter(item => item.user.user_id.toLowerCase().includes(e.toLowerCase()) || item.user.phone_mobile.toLowerCase().includes(e.toLowerCase()) || item.user.email.toLowerCase().includes(e.toLowerCase()))
  }

  // Assign Appointment to resource / add appointment start
  assignRequest;
  assignSuccessMsg: boolean = false;
  assignConflictMsg: boolean = false; 
  today_date = new Date()

  dateVal =
      this.today_date.getFullYear() +
      '-' +
      String(Number(this.today_date.getMonth()) + 1) +
      '-' +
      this.today_date.getDate() +
      ' ' +
      this.today_date.getHours() +
      ':' +
      this.today_date.getMinutes() +
      ':' +
      this.today_date.getSeconds();

  assignAppointment(assignDetails) {
    this.assignDetailsObj
    this.assignRequest = {
      "utility_id": this.assignDetailsObj.utility_id_string,
      "sa_id": this.assignDetailsObj.id_string,
      "user_id": assignDetails.user.id_string,
      "assignment_date": this.dateVal,
    }

    this.apiService.post('work-order/service-assignment', this.assignRequest).subscribe(assignObj => {
      if (assignObj.state == "success") {
        this.assignSuccessMsg = true
        this.showModalBox = false
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/work-order']);
          });
        }, 500);        
      }
    }, (err) => {
      this.assignConflictMsg = true
      this.showModalBox = false
    })
  }
  // Assign Appointment to resource / add appointment end


  // Deassignment Of service appointment start
  data; deAssignmentMsg: boolean = false;
  deAssignErrorMsg: boolean = false;
  deAssignAppointment() {
    this.filterService.getButtonEventByIdString().subscribe(deAssignment => {
      if (deAssignment.event == true && deAssignment.privilege == false) {
        this.data = {
          "is_active": false
        }
        this.apiService.put('work-order/service-deassignment/' + deAssignment.id_string, this.data).subscribe(deassignObj => {
          if (deassignObj.state == "success") {
            this.deAssignmentMsg = true
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['work-order']);
              });
            }, 500);
            
            this.utilityIdString = this.sessionService.getter('utility_id_string')
          }
        }, (err) => {
          console.log('err: ', err);
          this.deAssignErrorMsg = true
        })
      } else {
        this.deAssignErrorMsg = false
      }
    })
  }
  // Deassignment Of service appointment end

  showUserModalBox:boolean = false;userDetails;appointments;appointmentsError;showDate;
  showUserDetailModel(user_obj){
  this.showModalBox = false
  this.showUserModalBox = true
  this.userDetails = user_obj

  this.showDate = new Date()
  let date = JSON.stringify(this.showDate)
  date = date.slice(1,11)   
  
  let utilityIdString = this.sessionService.getter("utility_id_string")
  this.apiService.get('work-order/utility/'+utilityIdString+'/user/'+user_obj.user.id_string+'/service-assignment/list?assigned_date='+ date).subscribe(result=>{
      this.appointments = result.results
      console.log('======result=====',result)
  },
  (err)=>{
    this.appointments = undefined
    console.log('===err==',this.appointments,err)
    this.appointmentsError = "Appointment Not Assigned"
  })
  }
}
