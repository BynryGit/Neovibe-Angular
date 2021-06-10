import { Component, OnInit } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
  faPen,
  faCalendarAlt,
  faFilePdf,
  faMapMarkerAlt,
  faPrint,
  faTimesCircle,
  faEye,
  faPlus,
  faFileCsv,
  faStar,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common-services/api-service/api.service';
import { NoteDetailsService } from '../../common/note-details/note-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../common-services/session-service/session.service';
declare var $: any;

@Component({
  selector: 'app-consumer-services',
  templateUrl: './consumer-services.component.html',
  styleUrls: ['./consumer-services.component.scss'],
})
export class ConsumerServicesComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlus = faPlus;
  faPrint = faPrint;
  consumerIdString: String;
  utilityIdString = this.sessionService.getter('utility_id_string')
  meter_list = []
  profile = [];
  summery = [];
  consumer: any;
  trigger: any;
  serviceBlocks = [
    {
      image: '../../../../assets/images/applicant-block-gen-card1.png',
      name: 'Bill Pay',
      value: 1,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card3.png',
      name: 'Adjust Bill',
      value: 2,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card4.png',
      name: 'Payments',
      value: 3,
    },
    // {
    //   image: '../../../../assets/images/applicant-block-gen-card6.png',
    //   name: 'Change Meter',
    //   value: 4,
    // },
    // {
    // 	image : "../../../../assets/images/applicant-block-gen-card7.png",
    // 	name : "Service Contract",
    // 	value : 5
    // },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Connect',
      value: 6,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Disconnect',
      value: 7,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Transfer',
      value: 8,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card8.png',
      name: 'Services',
      value: 9,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card9.png',
      name: 'Complaints',
      value: 10,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card10.png',
      name: 'Update profile',
      value: 11,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card10.png',
      name: 'Offers',
      value: 12,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card10.png',
      name: 'Outage/Emergency',
      value: 13,
    },
  ];
  first_name_c;
  last_name_c;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sessionService : SessionService,
    private route: ActivatedRoute
  ) {
    // Code for receiving URL parameters start
    this.route.params.subscribe((params) => {
      this.consumerIdString = params.id;
    });
    // Code for receiving URL parameters end

    // Api call for consumer start
    this.apiService
      .get('consumer/' + this.consumerIdString)
      .subscribe((data) => {
        this.consumer = data['result'];
        // this.utilityIdString = this.consumer.utility_id_string
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

        this.first_name_c = this.consumer.first_name.charAt(0);
        this.last_name_c = this.consumer.last_name.charAt(0);
        console.log(" firstttt nameee",this.first_name_c)
        console.log(" lasttttt nameee",this.last_name_c)
      });
    // Api call for consumer end

    // Api call for consumer contract details start
    // this.apiService
    //   .get(
    //     'consumer/' + this.utilityIdString + '/service-contract-detail/list?consumer_id=' + this.consumerIdString
    //   )
    //   .subscribe((data) => {
    //     for (let item of data['results']) {
    //       this.profile.push({
    //         name: 'Service',
    //         value: item?.contract.utility_service.service.service_name,
    //       });
    //       this.profile.push({
    //         name: 'Contract',
    //         value: item.contract.name,
    //       });
    //     }
    //   });
    // Api call for consumer contract details end
  }

  ngOnInit(): void {
      // Code for receiving URL parameters start
      this.route.params.subscribe((params) => {
        this.consumerIdString = params.id;



        this.apiService
      .get('consumer/' + this.consumerIdString)
      .subscribe((data) => {
        this.consumer = data['result'];
        // this.utilityIdString = data['result']['utility_id_string'];

        // Api call for meter list
        this.apiService
          .get(
            'consumer/' +
              this.utilityIdString +
              '/service-contract-detail/list?consumer_id=' +
              this.consumerIdString + '&temporary_disconnected_meter=true'
          )
          .subscribe(
            (data) => {
              for (let item of data['results']) {
                this.meter_list.push({
                  id_string: item.id_string,
                  meter_no: item.meter_id.meter_no,
                  product_name: item.meter_id.utility_product_id.name,
                  product_id_string: item.meter_id.utility_product_id.id_string,
                });
              }
            },
            (error) => {
              console.log(error.error);
            }
          );
        // Api call for meter list end
      });

      });
      // Code for receiving URL parameters end
  }

  serviceClicked(val) {
    if(val == 1) {
      this.trigger = $('#BillPaymentModal').modal('show')
    }
    if (val == 12) {
      this.trigger = $('#offersModal').modal('show');
    }
    if (val == 11) {
      this.trigger = $('#profileChangeModal').modal('show');
    }
    if (val == 6) {
      this.trigger = $('#connectModal').modal('show');
    }
    if (val == 7) {
      this.trigger = $('#disconnectModal').modal('show');
    }
    if (val == 9) {
      this.trigger = $('#servicesModal').modal('show');
    }
    if (val == 10) {
      this.trigger = $('#complaintsModal').modal('show');
    }
    if (val == 13) {
      this.trigger = $('#outageModal').modal('show');
    }
    if (val == 8) {
      this.trigger = $('#transferModal').modal('show');
    }
    if (val == 3) {
      this.trigger = $('#paymentModal').modal('show');
    }
  }

  goToConsumerDetail() {
    this.router.navigate(['/consumer/view-consumer/'+ this.consumerIdString])
  }
  goToQuickAccess() {
    this.router.navigate(['/consumer/quick-services/'+this.consumerIdString]);
  }
}
