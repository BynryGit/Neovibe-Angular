import { Component, OnInit, OnDestroy} from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../registration.service'; 
import { baseUrl } from 'src/environments/environment';
import { NoteDetailsService } from '../../common/note-details/note-details.service';
import { PaymentDetailsService } from '../../common/payment-details/payment-details.service';
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-registration-detail-view',
  templateUrl: './registration-detail-view.component.html',
  styleUrls: ['./registration-detail-view.component.scss']
})
export class RegistrationDetailViewComponent implements OnInit {

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlus = faPlus;
  faPrint = faPrint;
  createdDate = false;
  registration : any = null
  addedSuccessfullyToast=false;
  rejectToast=false;
  holdToast=false;
  errortoast=false;
  profile = []
  setVip;
  isDisabled:boolean=false;
  public show:boolean = false;
  private subscription;
  toggle() {
    this.show = !this.show;
  }

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

  // Data for address details start
  address = []
  // Data for address details end

  // Data for kyc details start
  kycDocs = [
  	{
  		name : 'Pan card',
  		doc : '../../assets/images/upload1.jpg'
  	},
  	{
  		name : 'Energy bill',
  		doc : './../assets/images/upload2.jpg'
  	}
  ]
  // Data for kyc details end

  // Data for payment details start
  // static = {
  //   type : 'Registration fee',
  //   date : '09 Jan 2020',
  //   amount : 3000,
  //   mode : 'Online',
  //   id : 'TXN0035600'
  // }

  // paymentData = []
  // Data for payment details end

  // Data for notes details start
  notes = []
  // Data for notes details end

  // Data for payments start
  payments = []
  // Data for payments end

  // Data for lifeCycle details start
  timeLine = []
  // Data for lifeCycle details end

  // Data for tabs start
  tabList = [
    {
      name : 'Address Detail',
      class : 'nav-item nav-link st active',
      id : 'nav-addr-dtls-tab',
      href : '#nav-addr-dtls',
      ariaControls : "nav-addr-dtls",
      ariaSelected : "true"
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
      name : 'KYC',
      class : 'nav-item nav-link st',
      id : 'nav-kyc-tab',
      href : '#nav-kyc',
      ariaControls : "nav-kyc",
      ariaSelected : "false"
    },
    {
      name : 'Payment',
      class : 'nav-item nav-link st',
      id : 'nav-paymnt-tab',
      href : '#nav-paymnt',
      ariaControls : "nav-paymnt",
      ariaSelected : "false"
    },
    {
      name : 'Note',
      class : 'nav-item nav-link st',
      id : 'nav-notes-tab',
      href : '#nav-notes',
      ariaControls : "nav-notes",
      ariaSelected : "false"
    },
    {
      name : 'Timeline',
      class : 'nav-item nav-link st',
      id : 'nav-timeline-tab',
      href : '#nav-timeline',
      ariaControls : "nav-timeline",
      ariaSelected : "false"
    },
  ]
  // Data for tabs end

  // Data for registration detail start
  regDetails = {
    static : {},
    summery : [],
    profile : []
  }
  // Data for registration detail end
  first_name_c;
  last_name_c;
  idString : any;
  serviceStore;
  storeServiceList : any;
  contracts = [];

  constructor(private router : Router, private route : ActivatedRoute,
    private registrationService : RegistrationService, private noteService : NoteDetailsService,
    private paymentDetailsService : PaymentDetailsService, private apiService : ApiService) {
      console.log("oooooooooooooooooooooooooooooooooo")
    
    this.route.params.subscribe(params => {
      this.idString = params.id
    }); 

    const notesPromise = this.apiService.get('registration/'+this.idString+'/note/list').toPromise();

    

    const lifeCyclesPromise = this.apiService.get('registration/'+'life-cycles?registration_id='+this.idString).toPromise();

    // Registration details Api start
    this.apiService.get('registration/'+this.idString).subscribe(data=>{
      console.log("data=====",data)
      this.registration = data['result']
      this.serviceStore = this.registration.registration_obj['services']
      console.log("result====",this.serviceStore)
      for(let i of this.serviceStore){
        console.log("service==",i['service_contract_id'])

          this.apiService.get('utility/service-contract/'+i['service_contract_id']).subscribe(ress=>{
          
          this.storeServiceList=ress.result
          console.log("service contract list==",this.storeServiceList)

          
              console.log("inside for",ress['result'])
              this.contracts.push({
                // product : item.meter_id.utility_product_id.name,
                product : this.storeServiceList?.category?.utility_product?.name,              
                contract : this.storeServiceList?.name,
                category : this.storeServiceList?.category?.name,
                sub_category : this.storeServiceList?.sub_category?.name,
                deposite : this.storeServiceList?.deposite_amount
              })
              console.log("push item==",this.contracts)
            
            
        })

      }

      console.log("this is service list==",this.storeServiceList)

      
      this.address = [
        {
          address: data['result']['billing_address_line_1'],
          heading : 'Billing Address'
        },
      ]
      if(this.registration.is_vip == false){
        this.setVip = "No"
      }
      else if(this.registration.is_vip == true){
        this.setVip = "Yes"
      }

      this.profile.push({
	  		name : "Utility",
	  		value : this.registration.utility
      })
      this.profile.push({
        name : "Name",
        value : this.registration.first_name+" "+this.registration.last_name
      })
      this.profile.push({
        name : "Mobile",
        value : this.registration.phone_mobile
      })
      this.profile.push({
	  		name : "Email",
	  		value : this.registration.email_id
	  	})
      this.profile.push({
	  		name : "Ownership",
	  		value : this.registration.ownership.name
	  	})
      this.profile.push({
	  		name : "Vip",
	  		value : this.setVip
	  	})
      this.profile.push({
	  		name : "State",
	  		value : this.registration.billing_state.name
	  	})
      this.profile.push({
	  		name : "City",
	  		value : this.registration.billing_city.name
	  	})
      this.profile.push({
	  		name : "Area",
	  		value : this.registration.billing_area.name
	  	})
      this.profile.push({
	  		name : "Sub Area",
	  		value : this.registration.billing_sub_area.name
	  	})
      this.profile.push({
	  		name : "Zipcode",
	  		value : this.registration.billing_zipcode
	  	})
      
      this.profile.push({
        name : "Premise",
        value : this.registration.premise.name
      })

      // Registration notes Api start
      // notesPromise.then(data=>{
      //   for(let note of data){
      //     this.notes.push({
      //       id : note['id_string'],
      //       note_name : note['note_name'],
      //       note_color : note['note_color'],
      //       note : note['note'],
      //       date : note['created_date'],
      //       time : note['created_date'],
      //       user : this.registration.email_id,
      //     })
      //   }
      //   console.log("noteeeee data", this.notes)
      // })
      // Registration notes Api end

      notesPromise.then(data=>{
	  		for(let item of data.results){
	  			this.notes.push({
		            id : item.id_string,
		            note_name : item.note_name,
		            note_color : item.note_color,
		            note : item.note,
		            date : item.created_date,
		            time : item.created_date,
		            user : this.registration.email_id,
		        })
	  		}
	  	})

      

      // Registration life-cycles Api start
      lifeCyclesPromise.then(data=>{
        for(let item of data){
          this.timeLine.push({
            created_date  : item.created_date,
            title : item.title +' '+ item.state.toLowerCase(),
            time  : item.created_date,
            text  : item.lifecycle_text
          })
        }
      })
      // Registration life-cycles Api end

    this.first_name_c = this.registration.first_name.charAt(0);
    this.last_name_c = this.registration.last_name.charAt(0);

    })
    // Registration details Api end

    // Code for sending payments to component start
    this.apiService.get('registration/'+this.idString+'/payment/list').subscribe(data=>{
      for(let item of data){
        let transactions = []
        this.apiService.get('registration/payment/'+item.id_string+'/transaction/list').subscribe(data=>{
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
      console.log("=a=a=a=a=a=a=a==========",this.payments)
      // this.paymentDetailsService.sendPayments(data)
    })
    // Code for sending payments to component start
  }

  ngOnInit(): void {
    // Code for receiving note data from note component start
    this.subscription=this.noteService.getNoteResponse().subscribe(data=>{
      console.log("+++++++++++++++++++",data['data'])
      this.apiService.post('registration/'+this.idString+'/note',data['data']).subscribe(resp=>{
        if(resp.state == 'success'){                                                    
          window.location.reload();
        }
      },error=>{
        console.log(error.error)
      })
    })
    // Code for receiving note data from note component end
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  buttonClicked(state){
    this.isDisabled = true
    if(state == 'CREATED' || state == 'HOLD'){
      var data = {}
      this.apiService.put('registration/'+this.registration.id_string+'/approve', data).subscribe(data=>{
        if(data.state == 'success'){
          this.addedSuccessfullyToast = true;
          console.log(data)
          // this.router.navigateByUrl('/consumerops/registration');
          // window.location.reload(this.router.navigateByUrl('/consumerops/registration'))
          
          
          setTimeout(()=>{
            this.router.navigateByUrl('/consumerops/registration');
          }, 1100);      
        }
      },error=>{
        this.errortoast=true;
        this.isDisabled = false;
        console.log(error.error)
      })
    }
  }

  //registration reject start
  rejectRegistration(){
    this.isDisabled = true
    var data = {}
      this.apiService.put('registration/'+this.registration.id_string+'/reject', data).subscribe(data=>{
        if(data.state == 'success'){
          this.rejectToast= true;
          console.log(data)
          // this.router.navigateByUrl('/consumerops/registration');
          // window.location.reload(this.router.navigateByUrl('/consumerops/registration'))
          
          
          setTimeout(()=>{
            this.router.navigateByUrl('/consumerops/registration');
          }, 1100);      
        }
      },error=>{
        this.errortoast=true;
        this.isDisabled = false;
        console.log(error.error)
      })
  }

  //registration reject end

  //registration reject start
  holdRegistration(){
    this.isDisabled = true
    var data = {}
      this.apiService.put('registration/'+this.registration.id_string+'/hold', data).subscribe(data=>{
        if(data.state == 'success'){
          this.holdToast= true;
          console.log(data)
          // this.router.navigateByUrl('/consumerops/registration');
          // window.location.reload(this.router.navigateByUrl('/consumerops/registration'))
          
          
          setTimeout(()=>{
            this.router.navigateByUrl('/consumerops/registration');
          }, 1100);      
        }
      },error=>{
        this.errortoast=true;
        this.isDisabled = false;
        console.log(error.error)
      })
  }

  //registration reject end

  // // Registration approve Api start
  // approveRegistration(){
  //   this.registrationService.approveRegistration(this.idString).subscribe(data=>{
  //     if(data.state == 'success'){
  //       window.location.reload();
  //     }
  //   })
  // }
  // // Registration approve Api end

  // // Registration hold Api start
  // holdRegistration(){
  //   this.registrationService.holdRegistration(this.idString).subscribe(data=>{
  //     if(data.state == 'success'){
  //       window.location.reload();
  //     }
  //   })
  // }
  // // Registration hold Api end

  // // Registration reject Api start
  // rejectRegistration(){
  //   this.registrationService.rejectRegistration(this.idString).subscribe(data=>{
  //     if(data.state == 'success'){
  //       window.location.reload();
  //     }
  //   })
  // }
  // // Registration reject Api end

  // controlApproveButtonView(){
  //   if (this.regDetails.static['state'] == 'PENDING') {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  // controlHoldButtonView(){
  //   if (this.regDetails.static['state'] == 'PENDING') {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  // controlRejectButtonView(){
  //   if (this.regDetails.static['state'] == 'PENDING') {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

}
