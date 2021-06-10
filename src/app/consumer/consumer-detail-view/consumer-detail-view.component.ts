import { Component, OnInit, OnDestroy} from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common-services/api-service/api.service';
import { NoteDetailsService } from '../../common/note-details/note-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../common-services/session-service/session.service';
import { PaymentDetailsService } from '../../common/payment-details/payment-details.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Location} from '@angular/common';

@Component({
  selector: 'app-consumer-detail-view',
  templateUrl: './consumer-detail-view.component.html',
  styleUrls: ['./consumer-detail-view.component.scss']
})
export class ConsumerDetailViewComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlus = faPlus;
  faPrint = faPrint;
  consumerIdString = ""
  consumerTimeLine = []
  utilityIdString = this.sessionService.getter("utility_id_string");
  address = []
  profile = []
  summery = []
  notes = []
  consumer : any
  private subscription;
  // Data for payments start
  payments = []
  // Data for payments end

  DemokycDocs = [
  	{
  		name : 'Pan card',
  		doc : '../../assets/images/upload1.jpg'
  	},
  	{
  		name : 'Energy bill',
  		doc : './../assets/images/upload2.jpg'
  	}
  ]

  // Data for next previous button start
  buttons = [
  	{
  		name : 'Previous',
  		listClass : 'page-item disabled',
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
  // Data for next previous button end

  // Data for tabs start
  tabList = [
    {
      name : 'Address Detail',
      class : 'nav-item nav-link st active',
      id : 'nav-addr-dtls-tab',
      href : '#nav-addr-dtls',
      ariaControls : "nav-addr-dtls",
      ariaSelected : "false"
    },
    {
      name : 'Products',
      class : 'nav-item nav-link st',
      id : 'nav-services-tab',
      href : '#nav-services',
      ariaControls : "nav-services",
      ariaSelected : "false"
    },
    {
      name : 'Offers',
      class : 'nav-item nav-link st',
      id : 'nav-offers-tab',
      href : '#nav-offers',
      ariaControls : "nav-offers",
      ariaSelected : "false"
    },
    {
      name : 'KYC',
      class : 'nav-item nav-link st',
      id : 'nav-kyc-tab',
      href : '#nav-kyc',
      ariaControls : "nav-kyc",
      ariaSelected : "false"
    },
    // {
    //   name : 'Bill Payments',
    //   class : 'nav-item nav-link st',
    //   id : 'nav-payment-tab',
    //   href : '#nav-payment',
    //   ariaControls : "nav-payment",
    //   ariaSelected : "false"
    // },
    {
      name : 'Services',
      class : 'nav-item nav-link st',
      id : 'nav-service-tab',
      href : '#nav-service',
      ariaControls : "nav-service",
      ariaSelected : "false"
    },
    {
      name : 'Complaints',
      class : 'nav-item nav-link st',
      id : 'nav-complaint-tab',
      href : '#nav-complaint',
      ariaControls : "nav-complaint",
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
    {
      name : 'Bills',
      class : 'nav-item nav-link st',
      id : 'nav-bill-tab',
      href : '#nav-bill',
      ariaControls : "nav-bill",
      ariaSelected : "false"
    },
    {
      name : 'Payment',
      class : 'nav-item nav-link st',
      id : 'nav-payment-tab',
      href : '#nav-payment',
      ariaControls : "nav-payment",
      ariaSelected : "false"
    },
    {
      name : 'Change log',
      class : 'nav-item nav-link st',
      id : 'nav-change-log-tab',
      href : '#nav-change-log',
      ariaControls : "nav-change-log",
      ariaSelected : "false"
    },
  ]
  kycDocs = []
  // Data for kyc details end
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  first_name_c;
  last_name_c;

  constructor(private apiService : ApiService, private sessionService : SessionService, private noteService : NoteDetailsService, private router : Router, private route : ActivatedRoute,private paymentDetailsService : PaymentDetailsService, private location: Location) {
    // Code for receiving URL parameters start
  	this.route.params.subscribe(params => {
      this.consumerIdString = params.id
    });

    // Code for receiving URL parameters end
  	const notesPromise = this.apiService.get('consumer/'+this.consumerIdString+'/note/list').toPromise();
  	// Api call for consumer start
  	this.apiService.get("consumer/"+this.consumerIdString).subscribe(data=>{
  		this.consumer = data['result']
  		this.address.push({
          address: data['result']['billing_address_line_1'],
          heading : 'Billing Address',
          street: data['result']['billing_street'],
          zipcode : data['result']['billing_zipcode'],
  		})
  		this.profile.push({
	  		name : "Utility",
	  		value : this.consumer.utility
	  	})
      this.profile.push({
	  		name : "Name",
	  		value : this.consumer.first_name+" "+this.consumer.last_name
	  	})
	  	this.profile.push({
	  		name : "Mobile",
	  		value : this.consumer.phone_mobile
	  	})
      this.profile.push({
	  		name : "Email",
	  		value : this.consumer.email
	  	})
      this.profile.push({
        name : "State",
        value : this.consumer.billing_state.name
      })
      this.profile.push({
        name : "City",
        value : this.consumer.billing_city.name
      })
      this.profile.push({
        name : "Zipcode",
        value : this.consumer.billing_zipcode
      })
      this.profile.push({
	  		name : "Area",
	  		value : this.consumer.billing_area.name
	  	})
      this.profile.push({
        name : "Sub Area",
        value : this.consumer.billing_sub_area.name
      })
      this.profile.push({
        name : "Street",
        value : this.consumer.billing_street
      })
      this.profile.push({
        name : "Premise",
        value : this.consumer.premise.name
      })
	  	// Consumer notes api call start
	  	notesPromise.then(data=>{
	  		for(let item of data.results){
	  			this.notes.push({
		            id : item.id_string,
		            note_name : item.note_name,
		            note_color : item.note_color,
		            note : item.note,
		            date : item.created_date,
		            time : item.created_date,
		            user : this.consumer.first_name+" "+this.consumer.last_name,
                first_name : this.consumer.first_name.charAt(0),
                last_name : this.consumer.last_name.charAt(0),
		        })
	  		}
	  	})
	  	// Consumer notes api call end

    // Api call for consumer contract details start
  	// this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerIdString).subscribe(data=>{
    //   console.log(data['results'])
  	// 	for(let item of data['results']){
  	// 		this.profile.push({
		//   		name : "Service",
		//   		value : item?.contract?.utility_service?.service.service_name
		//   	})
		//   	this.profile.push({
		//   		name : "Contract",
		//   		value : item?.contract?.name
		//   	})
  	// 	}
  	// })
  	// Api call for consumer contract details end

    this.first_name_c = this.consumer.first_name.charAt(0);
    this.last_name_c = this.consumer.last_name.charAt(0);
    console.log(" firstttt nameee",this.first_name_c)
    console.log(" lasttttt nameee",this.last_name_c)

  	})
  	// Api call for consumer end

    // Code for sending payments to component start
    this.apiService.get('consumer/'+this.consumerIdString+'/payment/list').subscribe(data=>{
      for(let item of data['results']){
        let transactions = []
        this.apiService.get('consumer/'+item.id_string+'/payment-transactions/list').subscribe(data=>{
          for(let element of data){
            transactions.push({
              transactionSubType : element.transaction_sub_type.name,
              transactionAmount : element.transaction_amount
            })
          }
        })
        this.payments.push({
          paymentType : item.payment_type.name,
          paymentDate : item.transaction_date,
          paymentAmount : item.transaction_amount,
          paymentMode : item.payment_mode.name,
          paymentChannel : item.payment_channel.name,
          transactionId : item.transaction_id,
          transactions : transactions
        })
      }
      this.paymentDetailsService.sendPayments(this.payments)
      // this.paymentDetailsService.sendPayments(data)
    })
    // Code for sending payments to component end

    // code for fetching KYC detail
    this.apiService.get('utility/'+this.utilityIdString+'/document/list?consumer_id='+this.consumerIdString).subscribe(data => {
      for(let item of data['results']) {
        this.kycDocs.push({
          name : item.document_name,
          doc : item.document_generated_name
        })
      }
    })
    // code for fetching the KYC detail end 
    // api to fetch the consumer log 
  	this.apiService.get('consumer/lifecyclelist/'+this.consumerIdString).subscribe((data) =>{
  		// this.consumerTimeLine = data
      for(let item of data){
        this.consumerTimeLine.push({
          created_date  : item.created_date,
          title : item.title +' '+ item.state.toLowerCase(),
          time  : item.created_date,
          text  : item.lifecycle_text
        })
      }
      console.log("consumer timeeeeeeeeeee",this.consumerTimeLine)
  	})
    // api to fetch the consumer log end 

    
  }

  ngOnInit(): void {
  	// Code for receiving note data from note component start
    this.subscription=this.noteService.getNoteResponse().subscribe(data=>{
      console.log('note data',data)
      this.apiService.post('consumer/'+this.consumerIdString+'/note',data['data']).subscribe(resp=>{
        if(resp.state == 'success'){
          console.log("inside post note")
          window.location.reload();
        }
      })
    })
    // Code for receiving note data from note component end
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  // navigate to the quick access screen
  goToQuickAccess() {
    this.router.navigate(['/consumer/quick-services/'+this.consumerIdString]);
  }

  goToConsumerDetail() {
    this.router.navigate(['/consumer/view-consumer/'+ this.consumerIdString])
  }
  goToSearchConsumer() {
    this.location.back();
    // this.router.navigate(['consumer/search-consumer'])
  }
}
