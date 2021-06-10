import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-consumer-search',
  templateUrl: './consumer-search.component.html',
  styleUrls: ['./consumer-search.component.scss']
})
export class ConsumerSearchComponent implements OnInit {

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
  utilityIdString = this.sessionService.getter('utility_id_string')
  showexceptiontoast: boolean = false; 
  consumerIdString: string;

  	constructor(private sessionService : SessionService,private apiService : ApiService,private router : Router) { }

    ngOnInit(): void {
      this.showexceptiontoast = false;
    }

    searchConsumer(val, inp){
    	if (inp == "CONSUMER") {
    		this.apiService.get('consumer/utility/'+ this.utilityIdString + '/list?consumer_no='+val).subscribe(data=>{
          if(data.count == 1){
            // alert("Consumer exists!")
            this.consumerIdString = data['results'][0]['id_string']
            this.router.navigateByUrl('consumer/view-consumer/'+  this.consumerIdString);
          }
        },error=>{
          this.showexceptiontoast = true
        })
    	}else if (inp == "EMAIL") {
        this.apiService.get('consumer/utility/'+ this.utilityIdString + '/list?email_id='+val).subscribe(data=>{
          if(data.count == 1){
            // alert("Consumer exists!")
            this.consumerIdString = data['results'][0]['id_string']
            this.router.navigateByUrl('consumer/view-consumer/'+  this.consumerIdString);
          }
        },error=>{
          this.showexceptiontoast = true
        })
    	}else if (inp == "METER") {
        this.apiService.get('consumer/utility/'+ this.utilityIdString + '/list?meter_no='+val).subscribe(data=>{
          if(data.count == 1){
            // alert("Consumer exists!")
            this.consumerIdString = data['results'][0]['id_string']
            this.router.navigateByUrl('consumer/view-consumer/'+  this.consumerIdString);
          }
        },error=>{
          this.showexceptiontoast = true
        })
    	}else if (inp == "PHONE") {
        this.apiService.get('consumer/utility/'+ this.utilityIdString + '/list?phone_mobile='+val).subscribe(data=>{
          if(data.count == 1){
            // alert("Consumer exists!")
            this.consumerIdString = data['results'][0]['id_string']
            this.router.navigateByUrl('consumer/view-consumer/'+  this.consumerIdString);
          }
        },error=>{
          this.showexceptiontoast = true
        })
    	}
    }
}
