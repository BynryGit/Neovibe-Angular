import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { ApiService } from './../../../common-services/api-service/api.service';
import { NoteDetailsService } from 'src/app/common/note-details/note-details.service';
import { SessionService } from './../../../common-services/session-service/session.service';

@Component({
  selector: 'app-meter-detail-view',
  templateUrl: './meter-detail-view.component.html',
  styleUrls: ['./meter-detail-view.component.scss']
})
export class MeterDetailViewComponent implements OnInit {

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  datePipe = new DatePipe('en-US');
  private subscription;
  meter_id_String;
  meter_details;
  consumer_meter_details;
  meter_summary = []
  meter_notes = []
  activity_log = []
  utilityIdString = this.sessionService.getter("utility_id_string");
  
  // Used For Meter Reading Table Start
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  // Used For Meter Reading Table End

  // Used For Work Order Table Start
  dtOptions1: DataTables.Settings = {};
  dataSet1;
  processing1;
  dtTrigger1: Subject<any> = new Subject<any>();
  // Used For Work Order Table End

  // Data For Next Previous Button Start
  buttons = [
    {
      name : 'Previous',
      listClass : 'page-item',
      icon : this.faChevronLeft,
      href : ''
    },
    {
      name : 'Next',
      listClass : 'page-item',
      icon : this.faChevronRight,
      href : ''
    }
  ]
  // Data For Next Previous Button End

  // Data For Tabs Start
  tabList = [
    {
      name : 'Meter Reading',
      class : 'nav-item nav-link st active',
      id : 'nav-meter-reading-tab',
      href : '#nav-meter-reading',
      ariaControls : "nav-meter-reading",
      ariaSelected : "false"
    },
    {
      name : 'Work Order',
      class : 'nav-item nav-link st',
      id : 'nav-work-order-tab',
      href : '#nav-work-order',
      ariaControls : "nav-work-order",
      ariaSelected : "true"
    },
    {
      name : 'Activity log',
      class : 'nav-item nav-link st',
      id : 'nav-activity-log-tab',
      href : '#nav-activity-log',
      ariaControls : "nav-activity-log",
      ariaSelected : "false"
    },
    {
      name : 'Notes',
      class : 'nav-item nav-link st',
      id : 'nav-notes-tab',
      href : '#nav-notes',
      ariaControls : "nav-notes",
      ariaSelected : "false"
    },
  ]
  // Data For Tabs End

  // Meter Reading Table Heading Parameter Start
  meter_reading_blocks = [
    {
      name :  "Meter Number",
    },
    {
      name :  "Consumer Number",
    },
    {
      name :  "Current Reading",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action"
    }
  ]
  // Meter Reading Table Heading Parameter End

  // Meter Reading Table Heading Parameter Start
  work_order_blocks = [
    {
      name :  "Meter Number",
    },
    {
      name :  "Consumer Number",
    },
    {
      name :  "Current Reading",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action"
    }
  ]
  // Meter Reading Table Heading Parameter End

  constructor(private route : ActivatedRoute, private apiService : ApiService, private noteService : NoteDetailsService, private sessionService : SessionService) { 
    
    // Get Id_String From URL Start
    this.route.params.subscribe(params => {
      this.meter_id_String = params.id_string
    });
    // Get Id_String From URL End

    // Get Note List API Start
    const notesPromise = this.apiService.get('meter-data/meter/note/list?utility__id_string='+ this.utilityIdString + '&identification_id=' + this.meter_id_String).toPromise();
    // Get Note List API End

    // Get Meter Log API Start
    this.apiService.get('meter-data/meter/life-cycle/list?utility__id_string='+ this.utilityIdString + '&object_id=' + this.meter_id_String).subscribe(
      data=>{
        for (let value of data.results) {
          this.activity_log.push(
            {
              date  : value.created_date,
              title : value.title + ' ' + value.state.toLowerCase(),
              time  : value.created_date,
              text  : value.lifecycle_text
            }
          );
        }
      },
      error => {
        if (error.error.state == "error") {
          console.log("Meter Life Cycle", error.error.results)
        }else{
          console.log("Meter Life Cycle", error)
        }
      }
    )
    // Get Meter Log API End

    // Get Meter API Start
    this.apiService.get('meter-data/meter/'+ this.meter_id_String).subscribe(
      data=>{
        if (data.state == "success") {
          this.meter_details = data.result

          if (this.meter_details.Previous_Record === null){
            this.buttons[0].listClass = 'page-item disabled'
          }else{
            this.buttons[0].href = 'meter-data/meter-detail-view/' + this.meter_details.Previous_Record
          }

          if(this.meter_details.Next_Record === null){
            this.buttons[1].listClass = 'page-item disabled'
          }else{
            this.buttons[1].href = 'meter-data/meter-detail-view/' + this.meter_details.Next_Record
          }

          if (this.meter_details.state_id === null){
            var state = 'Na'
          }else{
            state = this.meter_details.state_id.name
          }

          if (this.meter_details.city_id === null){
            var city = 'Na'
          }else{
            city = this.meter_details.city_id.name
          }
          
          this.meter_summary.push(
            {
              name : "Tenant",
              value : this.meter_details.tenant.short_name
            },
            {
              name : "Utility",
              value : this.meter_details.utility.name
            },
            {
              name : "State",
              value : state
            },
            {
              name : "City",
              value : city
            },
            {
              name : "Route",
              value : this.meter_details.route_id.name
            },
            {
              name : "Premise",
              value : this.meter_details.premise_id.name
            },
            {
              name : "Meter Type",
              value : this.meter_details.meter_type_id.value
            },
            {
              name : "Current Reading",
              value : this.meter_details.current_reading
            },
            {
              name : "Install Date",
              value : this.datePipe.transform(this.meter_details.install_date, 'dd MMM yyyy')
            },
            {
              name : "Latitude",
              value : this.meter_details.latitude
            },
            {
              name : "Longitude",
              value : this.meter_details.longitude
            },
          )
          // Meter Notes Set Data Start
	  	    notesPromise.then(data=>{
	  		    for(let item of data.results){
	  			    this.meter_notes.push(
                {
                  id : item.id_string,
                  note_name : item.note_name,
                  note_color : item.note_color,
                  note : item.note,
                  date : item.created_date,
                  time : item.created_date,
                  user : this.meter_details.meter_no,
		            }
              )
	  		    }
	  	    })
	  	    // Meter Notes Set Data End
        }
      },
      error => {
        if (error.error.state == "error") {
          console.log("Meter Details", error.error.results)
        }else{
          console.log("Meter Details", error)
        }
      }
    )
    // Get Meter API End
  }

  ngOnInit(): void {
    this.subscription = this.noteService.getNoteResponse().subscribe(data=>{
      // Add Meter Note API Start
      this.apiService.post('meter-data/meter/' + this.meter_id_String + '/note', data['data']).subscribe(
        data=>{
          if(data.state == 'success'){
            window.location.reload();
          }
        },
        // todo error occure on note add every time post method call on reload page
        error => {
          if (error.error.state == "error") {
            console.log("Meter Note", error)
          }else{
            console.log("Meter Note", error)
          }
        }
      )
      // Add Meter Note API End
    })

    // API For Getting Meter Reading Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/meter-reading/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&meter_id_String=' + this.meter_id_String).subscribe(data => {
            that.dataSet = data.results;
            this.dtTrigger.next();
            that.processing = false
            callback({
              recordsTotal: data.count,
              recordsFiltered: data.count,
              data: []
            });
        });
      },
    };
    // API For Getting Meter Reading End

    // API For Getting Work Order Start
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing1 = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/meter-reading/list?page=${page}&page_size=${this.dtOptions1.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&meter_id_String=' + this.meter_id_String).subscribe(data => {
            that.dataSet1 = data.results;
            this.dtTrigger1.next();
            that.processing1 = false
            callback({
              recordsTotal: data.count,
              recordsFiltered: data.count,
              data: []
            });
        });
      },
    };
    // API For Getting Work Order End
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
