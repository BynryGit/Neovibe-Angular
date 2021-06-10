import { Component, OnInit } from '@angular/core';
import { StepperFormService } from '../../../common/stepper-form/stepper-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { from } from 'rxjs';
declare var $ : any;
import { BillingService } from '../../billing.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-billing-schedule-run',
  templateUrl: './billing-schedule-run.component.html',
  styleUrls: ['./billing-schedule-run.component.scss']
})
export class BillingScheduleRunComponent implements OnInit {

  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faPrint = faPrint;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;

  // Stepper data start
  blocks = [
    {
      name: 'Bill Data',
      id: 'bill-data-dtls-tab',
      href: '#bill-data-dtls',
      class: 'nav-link active',
      areaControl: 'bill-data-dtls',
      listClass: 'nav-item list-group-item active'
    },
    {
      name: 'View Bill',
      id: 'view-bill-data-dtls-tab',
      href: '#view-bill-data-dtls',
      class: 'nav-link',
      areaControl: 'view-bill-data-dtls',
      listClass: 'nav-item list-group-item'
    }
  ]

  constructor(private stepperFormService: StepperFormService, private route: ActivatedRoute,
     private apiService: ApiService, private billingService:BillingService, private router:Router) { }

  idString; summaryDetails; getConsumer = 0;rateDetails;

  ngOnInit(): void {   

    this.route.params.subscribe(params => {
      this.idString = params.id_string
    });

    this.sendStepperFormData()
    this.getAllBillCharges()
  }

  hideRunBillButton:boolean = true
  rate_obj:any;schedule_bill_id_string:any;summaryDetail;
  getAllBillCharges(){
    this.apiService.get('billing/get-charges/' + this.idString).subscribe(details => {
      this.summaryDetail = details.result[0]
      this.schedule_bill_id_string = this.summaryDetail.schedule_bill_id_string
      this.rate_obj = this.summaryDetail.rate
      if(this.summaryDetail.consumer_count != '----' && this.summaryDetail.consumer_count != 0){
        if(this.summaryDetail.consumer_count == this.summaryDetail.reading_count){
          this.hideRunBillButton = false
        }
      }
    })
  }
  consumerDetails;
  save_run_bill(){
   let data = {
      "schedule_bill_id_string":this.schedule_bill_id_string,
      "rate_obj": this.rate_obj
    }
    this.apiService.post('billing/save-run-bill/' , data).subscribe(details => {
      if (details.state == 'success'){
        this.apiService.get('billing/schedule/'+details.result.schedule_bill_id_string+'/consumer/list').subscribe(result=>{
          this.consumerDetails = result.results
          console.log('this.consumerDetails: ', this.consumerDetails);
        })
        $('#view-bill-data-dtls-tab').trigger( "click" );
      }
    })
    
  }

  sendStepperFormData() {
    this.stepperFormService.stepperFormEvent.emit(this.blocks);
  }


  testing() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      e.target // newly activated tab
      $('a[data-toggle="tab"]').parent(".list-group-item").removeClass("active").removeClass("finished");
    })
    $('#bill-data-dtls-tab').on('shown.bs.tab', function (e) {
      e.target // newly activated tab               
      $(this).parent(".list-group-item").addClass("active");
    });
    $('#view-bill-data-dtls-tab').on('shown.bs.tab', function (e) {
      $('#bill-data-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");             
      $(this).parent(".list-group-item").addClass("active");
    });


    $(".pr-custom-accordion .btn-link").on("click", function () {
      $(this).find('.counter').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({ countNum: $this.text() }).animate({
          countNum: countTo
        },
          {
            duration: 1800,
            easing: 'linear',
            step: function () {
              $this.text(Math.floor(parseInt(this.countNum)));
            },
            complete: function () {
              $this.text(this.countNum);
              $this.parent().addClass('done');
            }
          });
      });
      $(this).parent().next().find('.pr-content-loader').each(function () {
        $(this).addClass('disappear');
      });
    });
  }

  showInvoive=false;
  viewBillInvoice(consumer_no,bill_schedule_log_id){
    this.apiService.get('billing/'+bill_schedule_log_id+'/consumer/'+consumer_no+'/generate-invoice').subscribe(consumer=>{
      this.billingService.getInvoiceTempalteDetails(consumer.result)
      setTimeout(() => {
        this.showInvoive = true
      }, 0);
      this.showInvoive = false
    })
  }
}
