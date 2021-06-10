import { Component, OnInit, Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';
import { FilterService } from '../../../common/filter/filter.service';
import { CommonService } from 'src/app/common/common.service';
declare var $: any;

@Component({
  selector: 'app-service-approve',
  templateUrl: './service-approve.component.html',
  styleUrls: ['./service-approve.component.scss']
})
export class ServiceApproveComponent implements OnInit {

  @Input() trigger
  searchText;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  utilityIdString = this.sessionService.getter("utility_id_string");
  serviceid;
  serviceData:any=[];
  remarkAdd: FormGroup;
  remark_add;
  remarkSubmitted = false;
  errortoast=false;
  rejectToast=false;
  holdToast=false;
  approveToast=false;
  rejectAndHoldToast=false;
  onRejectOrHold=false;

  get rm() { return this.remarkAdd.controls; }

  get remarkItems() {
    return this.remarkAdd.get('remarkItemsControl') as FormArray;
  }

  constructor(private formbuilder: FormBuilder, private filterService : FilterService, private router : Router,private commonServices:CommonService,private apiService : ApiService, private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      console.log("UTILINMMM",data.text);
      this.searchText = data.text;
    })

    this.remarkAdd = this.formbuilder.group({  
      remarkItemsControl: this.formbuilder.array(
        [this.formbuilder.group({
          remark: [null,[Validators.required]],           
        })]
      ),          
    });
                                                                                                                                                                                                                                                                             
  }

  ngOnInit(): void {

    this.filterService.getButtonEventByIdString().subscribe(detailVal=>{
      this.serviceid=detailVal.id_string

      console.log("+++++++++++++service id string++++++++++++++++++",this.serviceid)
      
        $('#serviceApproveModal').modal('show');  
        this.apiService.get('work-order/service-appointment/'+this.serviceid).subscribe(data=>{
          this.serviceData = data['results'];
          console.log("???????????????????????????????????",this.serviceData)
        })                   
    })
  }

    //Service request reject start
    onServiceReject(){
      this.onRejectOrHold=true;
      if (this.remarkAdd.invalid) {
        this.rejectAndHoldToast=true;
        return;
      }else{
        this.remarkSubmitted = true;
        for(let item of this.remarkItems.controls){
          this.remark_add=item.value.remark
        }
        if(this.serviceData.recurring_id.value == "Yes"){
          let data ={
          sa_user_remark:this.remark_add,
          frequency_id:this.serviceData.frequency_id.id_string,
          repeat_every_id:this.serviceData.repeat_every_id.id_string,
          recurring_id:this.serviceData.recurring_id.id_string,      
        }
  
        console.log("Data",data);
        this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/reject',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          
          $('#serviceApproveModal').modal('hide');
          this.holdToast= true;
          this.remarkAdd.reset();
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/service-processing']);
            });
          }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        });

        }else{
            let data ={
            sa_user_remark:this.remark_add,
            recurring_id:this.serviceData.recurring_id.id_string,      
          }
    
          console.log("Data",data);
          this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/reject',data).subscribe(result=>{
            console.log('REEEEEEEE: ', result);
            
            $('#serviceApproveModal').modal('hide');
            this.holdToast= true;
            this.remarkAdd.reset();
            setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/consumer/service-processing']);
              });
            }, 1200);
          },
          error=>{
            console.log("this is an error===",error)
            this.errortoast = true;
          });

        }

      }
      
  
    }
    //Service request reject end
  
    //Service request hold start
    onServiceHold(){
      this.onRejectOrHold=true;
      if (this.remarkAdd.invalid) {
        this.rejectAndHoldToast=true;
        return;
      }else{
        this.remarkSubmitted = true;
        for(let item of this.remarkItems.controls){
          this.remark_add=item.value.remark
        }
        if(this.serviceData.recurring_id.value == "Yes"){
          let data ={
          sa_user_remark:this.remark_add,
          frequency_id:this.serviceData.frequency_id.id_string,
          repeat_every_id:this.serviceData.repeat_every_id.id_string,
          recurring_id:this.serviceData.recurring_id.id_string,      
        }
  
        console.log("Data",data);
        this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/hold',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          
          $('#serviceApproveModal').modal('hide');
          this.holdToast= true;
          this.remarkAdd.reset();
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/service-processing']);
            });
          }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        });

        }else{
            let data ={
            sa_user_remark:this.remark_add,
            recurring_id:this.serviceData.recurring_id.id_string,      
          }
    
          console.log("Data",data);
          this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/hold',data).subscribe(result=>{
            console.log('REEEEEEEE: ', result);
            
            $('#serviceApproveModal').modal('hide');
            this.holdToast= true;
            this.remarkAdd.reset();
            setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/consumer/service-processing']);
              });
            }, 1200);
          },
          error=>{
            console.log("this is an error===",error)
            this.errortoast = true;
          });

        }
        

      }
      
  
    }
    //Service request hold end
  
    //Service request Approve start
    onServiceApprove(){
      console.log('=========inside ***')
      this.onRejectOrHold=true;
      if (this.remarkAdd.invalid) {
        this.rejectAndHoldToast=true;
        return;
      }else{

        console.log('======inside else ------')
        this.remarkSubmitted = true;
        for(let item of this.remarkItems.controls){
          this.remark_add=item.value.remark
        }

        console.log('------after for loop-------')
        if(this.serviceData.recurring_id.value == "Yes"){

          console.log('--------in iffffffffff====')

          let data ={
          sa_user_remark:this.remark_add,
          frequency_id:this.serviceData.frequency_id.id_string,
          repeat_every_id:this.serviceData.repeat_every_id.id_string,
          recurring_id:this.serviceData.recurring_id.id_string,
          start_date:this.serviceData.start_date,
          end_date:this.serviceData.end_date,
          address_line_1: this.serviceData.billing_address_line_1,
          street: this.serviceData.street,
          zipcode: this.serviceData.zipcode,
          state_id: this.serviceData.consumer_service_contract_detail_id.consumer_id.billing_state.id_string,
          city_id: this.serviceData.consumer_service_contract_detail_id.consumer_id.billing_city.id_string,
          area_id: this.serviceData.consumer_service_contract_detail_id.consumer_id.billing_area.id_string,
          sub_area_id: this.serviceData.consumer_service_contract_detail_id.consumer_id.billing_sub_area.id_string,
          premise_id: this.serviceData.consumer_service_contract_detail_id.consumer_id.premise.id_string,
          consumer_service_contract_detail_id: this.serviceData.consumer_service_contract_detail_id.id_string,
          utility: this.serviceData.utility,
          work_order_master_id: this.serviceData.work_order_master_id.id_string,
        }
  
        console.log("Data",data);
        this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/request/approve',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          
          $('#serviceApproveModal').modal('hide');
          this.approveToast= true;
          this.remarkAdd.reset();
          
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/service-processing']);
            });
          }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        });

        }else{
          console.log('======in else==========')
          let data ={
          sa_user_remark:this.remark_add,
          recurring_id:this.serviceData.recurring_id.id_string,
          start_date:this.serviceData.start_date,
          end_date:this.serviceData.end_date,
          consumer_service_contract_detail_id: this.serviceData.consumer_service_contract_detail_id.id_string,
          work_order_master_id: this.serviceData.work_order_master_id.id_string,
        }
  
        console.log("Data",data);
        this.apiService.put('work-order/service-appointment/'+this.serviceData.id_string+'/request/approve',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          
          $('#serviceApproveModal').modal('hide');
          this.approveToast= true;
          this.remarkAdd.reset();
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/service-processing']);
            });
          }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        });

        }

       

      }
      
  
    }
    //Service request Approve end

    onCancel(){
      this.remarkAdd.reset();
    }

}
