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
  selector: 'app-connection-approve',
  templateUrl: './connection-approve.component.html',
  styleUrls: ['./connection-approve.component.scss']
})
export class ConnectionApproveComponent implements OnInit {

  @Input() trigger
  searchText;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  utilityIdString = this.sessionService.getter("utility_id_string");
  connectionid;
  connectionData:any=[];
  remarkAdd: FormGroup;
  remark_add;
  selected_premise;
  remarkSubmitted = false;
  errortoast=false;
  newerrortoast = false;
  rejectAndHoldToast=false;
  rejectToast=false;
  holdToast=false;
  approveToast=false;
  premiseMeterForm: FormGroup;
  premiseMeterFormSubmitted = false;
  premiselist:any=[];
  meterStore : any[] = [];
  isDisplay=false;
  isShow=false;
  isAddress=false;
  connectionapprove: FormGroup;
  meterSelect: FormGroup;
  consumerdata;
  addedSuccessfullyToast=false;
  workOrderDetailsForm: FormGroup;
  workSubType : any[] = [];
  workMaster : any[] = [];
  workOrderTypelist:any=[];
  work_order_master_id;
  meter_id;
  onApprove=false;
  onRejectOrHold=false;
  getSubareaId;

  // premise form control start
  get ad() { return this.premiseMeterForm.controls; }
  // premise control end

  // work order details form control start
  get wo() { return this.workOrderDetailsForm.controls; }
  // work order details form control end

  get rm() { return this.remarkAdd.controls; }

  get ms() { return this.meterSelect.controls; }

  get ca() {return this.connectionapprove.controls; }

  get workItems() {
    return this.workOrderDetailsForm.get('workItemsControl') as FormArray;
  }

  get remarkItems() {
    return this.remarkAdd.get('remarkItemsControl') as FormArray;
  }

  get premiseItems() {
    return this.premiseMeterForm.get('premiseItemsControl') as FormArray;
  }

  get meterItems() {
    return this.meterSelect.get('meterItemsControl') as FormArray;
  }

  constructor(private formbuilder: FormBuilder, private filterService : FilterService, private router : Router,private commonServices:CommonService,private apiService : ApiService, private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      console.log("UTILINMMM",data.text);
      this.searchText = data.text;
    })

    

    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data=>{
      this.workOrderTypelist = data;
      console.log(this.workOrderTypelist.results)
    })

    this.remarkAdd = this.formbuilder.group({  
      remarkItemsControl: this.formbuilder.array(
        [this.formbuilder.group({
          remark: [null,[Validators.required]],           
        })]
      ),          
    });

    this.premiseMeterForm = this.formbuilder.group({
      premiseItemsControl: this.formbuilder.array(
        [this.formbuilder.group({
          premise: [null, [Validators.required]],
          // meter: [null, [Validators.required]],
          // workOrderMaster: [null, [Validators.required]]            
        })]
      ),
    });

    this.meterSelect = this.formbuilder.group({
      meterItemsControl: this.formbuilder.array(
        [this.formbuilder.group({
          // premise: [null, [Validators.required]],
          meter: [null, [Validators.required]],
          // workOrderMaster: [null, [Validators.required]]            
        })]
      ),
    });

    this.workOrderDetailsForm = this.formbuilder.group({
      workItemsControl: this.formbuilder.array(
        [this.formbuilder.group({
          workOrderType: [null, [Validators.required]],
          workOrderSubType: [null, [Validators.required]],
          workOrderMaster: [null, [Validators.required]]            
        })]
      ),
    });
                                                                                                                                                                                                                                                                             
  }

  onPremiseClick(index){
    this.meterStore=[]
    let type_id_string = this.premiseItems.at(index).value.premise.id_string
      console.log("____________________________",type_id_string)
      this.apiService.get('meter-data/meter'+'/list?premise_id='+type_id_string).subscribe(data=>{
        console.log(data)
        for(let item of data['results']){
          this.meterStore.push({
            meter_no : item.meter_no,
            id_string : item.id_string
          })
        }
      },error=>{
        console.log(error.error)
      })

  }

  onWorkorderType(index){
    this.workSubType=[]
    let type_id_string = this.workItems.at(index).value.workOrderType.id_string
      console.log("____________________________",type_id_string)
      this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list?utility_work_order_type_id='+type_id_string).subscribe(data=>{
        console.log(data)
        for(let item of data['results']){
          this.workSubType.push({
            name : item.name,
            id_string : item.id_string
          })
        }
      },error=>{
        console.log(error.error)
      })

  }

  onWorkorderSubType(index){
    this.workMaster=[]
    let type_id_string = this.workItems.at(index).value.workOrderType.id_string
    let sub_type_id_string = this.workItems.at(index).value.workOrderSubType.id_string
      console.log("______________type______________",type_id_string)
      console.log("______________subtype______________",sub_type_id_string)
      this.apiService.get('work-order/utility/'+this.utilityIdString+'/list?utility_work_order_type_id='+type_id_string+'&utility_work_order_sub_type_id='+sub_type_id_string).subscribe(data=>{
        console.log(data)
        for(let item of data['results']){
          this.workMaster.push({
            name : item.name,
            id_string : item.id_string
          })
        }
        console.log("++WORK MASTER++",this.workMaster)
      },error=>{
        console.log(error.error)
      })

  }

  onCancel(){
    this.workOrderDetailsForm.reset();
    this.premiseMeterForm.reset();
    this.remarkAdd.reset();
    this.connectionapprove.reset();
    this.meterStore=[];
    this.workSubType=[];
    this.workMaster=[];
  }

  toggleDisplay(){
    this.isDisplay=!this.isDisplay;
  }

  toggleShow(){
    this.isShow=!this.isShow;
  }

  toggleAddress(){
    this.isAddress=!this.isAddress;
  }

  OnApproveConsumer(){
    this.onApprove=true;
    if(this.premiseMeterForm.invalid){
      this.newerrortoast=true;
      return;
    }
    else if(this.connectionapprove.invalid){
      this.newerrortoast=true;
      return;
    }
    else if(this.workOrderDetailsForm.invalid){
      this.newerrortoast=true;
      return;
    }else{
          console.log("|||||||||||||||||||",this.connectionapprove.value.connectionMeter)

        if(this.connectionapprove.value.connectionMeter == "yes"){
          console.log("insideeeeeeeeee yeeeeeeesss")

          for(let item of this.remarkItems.controls){
            this.remark_add=item.value.remark
          }
          console.log("<<<<<<<<>>>>>>>>>>>>>>",this.remark_add)
      
          for(let item of this.premiseItems.controls){
            this.selected_premise=item.value.premise
          }
      
          for(let item of this.workItems.controls){
            this.work_order_master_id=item.value.workOrderMaster.id_string
          }
      
          this.consumerdata={
            // consumer_service_contract_detail_id: "5b6403d6-c18f-4889-9b04-00e8af89d2e9",
            consumer_service_contract_detail_id: this.connectionid,
            utility_id:this.sessionService.getter("utility_id_string"),
            meter_status: this.connectionapprove.value.connectionMeter,
            sa_user_remark:this.remark_add,
            address_line_1:this.connectionData.consumer_id.billing_address_line_1,
            zipcode:this.connectionData.consumer_id.billing_zipcode,
            street:this.connectionData.consumer_id.billing_street,
            state_id:this.connectionData.consumer_id.billing_state.id_string,
            city_id:this.connectionData.consumer_id.billing_city.id_string,
            area_id:this.connectionData.consumer_id.billing_area.id_string,
            sub_area_id:this.connectionData.consumer_id.billing_sub_area.id_string,
            premise_id:this.selected_premise.id_string,
            work_order_master_id:this.work_order_master_id
            // premise_id:this.connectionData.consumer_id.premise.id_string
          }
          this.apiService.post('consumer/service-contract-detail',this.consumerdata).subscribe(result=>{
            console.log('result: ', result);
            $('#connectApproveModal').modal('hide');
            this.addedSuccessfullyToast = true;
            this.remarkAdd.reset()
            // setTimeout(()=>{
            //   window.location.reload()
            //   // this.router.navigateByUrl('/consumer/complaints-processing');
            // }, 1200);
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/consumer-processing']);
            });
          }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        })
        console.log('consumer: ', this.consumerdata);

        }else if(this.connectionapprove.value.connectionMeter == "no"){
          console.log("insideeeeeeeeee noo0oooooo")

          for(let item of this.remarkItems.controls){
            this.remark_add=item.value.remark
          }
          console.log("<<<<<<<<>>>>>>>>>>>>>>",this.remark_add)
      
          for(let item of this.premiseItems.controls){
            this.selected_premise=item.value.premise
          }
      
          for(let item of this.workItems.controls){
            this.work_order_master_id=item.value.workOrderMaster.id_string
          }
      
          for(let item of this.meterItems.controls){
            this.meter_id=item.value.meter.id_string
          }
      
          console.log("<<<<<<<<meter>>>>>>>>>>>>>>",this.meter_id)
      
          this.consumerdata={
            // consumer_service_contract_detail_id: "5b6403d6-c18f-4889-9b04-00e8af89d2e9",
            consumer_service_contract_detail_id: this.connectionid,
            utility_id:this.sessionService.getter("utility_id_string"),
            meter_status: this.connectionapprove.value.connectionMeter,
            sa_user_remark:this.remark_add,
            address_line_1:this.connectionData.consumer_id.billing_address_line_1,
            zipcode:this.connectionData.consumer_id.billing_zipcode,
            street:this.connectionData.consumer_id.billing_street,
            state_id:this.connectionData.consumer_id.billing_state.id_string,
            city_id:this.connectionData.consumer_id.billing_city.id_string,
            area_id:this.connectionData.consumer_id.billing_area.id_string,
            sub_area_id:this.connectionData.consumer_id.billing_sub_area.id_string,
            premise_id:this.selected_premise.id_string,
            work_order_master_id:this.work_order_master_id,
            meter_id:this.meter_id
            // premise_id:this.connectionData.consumer_id.premise.id_string
          }
          this.apiService.post('consumer/service-contract-detail',this.consumerdata).subscribe(result=>{
            console.log('result: ', result);
            $('#connectApproveModal').modal('hide');
            this.addedSuccessfullyToast = true;
            this.remarkAdd.reset()
            // setTimeout(()=>{
            //   window.location.reload()
            //   // this.router.navigateByUrl('/consumer/complaints-processing');
            // }, 1200);
            setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/consumer/consumer-processing']);
              });
            }, 1200);
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        })
        console.log('consumer: ', this.consumerdata);
      }

    }

    

    
  }

  //Connection request reject start
  onRejectConsumer(){
    this.onRejectOrHold=true;
    if (this.remarkAdd.invalid) {
      this.rejectAndHoldToast=true;
      return;
    }
    else{
    this.remarkSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      let data ={
        sa_user_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('consumer/'+this.connectionid+'/service-contract-detail/reject',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        
        $('#connectApproveModal').modal('hide');
        this.rejectToast = true;
        this.remarkAdd.reset();
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/consumer/consumer-processing']);
          });
        }, 1200);

      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });
    }
  }
  //Connection request reject end

  //Connection request hold start
  onHoldConsumer(){
    this.onRejectOrHold=true;
    if (this.remarkAdd.invalid) {
      this.rejectAndHoldToast=true;
      return;
    }
    else{
    this.remarkSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      let data ={
        sa_user_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('consumer/'+this.connectionid+'/service-contract-detail/hold',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        
        $('#connectApproveModal').modal('hide');
        this.holdToast = true;
        this.remarkAdd.reset();
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/consumer/consumer-processing']);
          });
        }, 1200);
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });
    }
  }
  //Connection request hold end



  ngOnInit(): void {

    this.connectionapprove = this.formbuilder.group({            
      connectionMeter: [null, [Validators.required]],
    });

    this.filterService.getButtonEventByIdString().subscribe(detailVal=>{
      this.connectionid=detailVal.id_string

      console.log("+++++++++++++connection id string++++++++++++++++++",this.connectionid)
      
        $('#connectApproveModal').modal('show');  
        this.apiService.get('consumer/'+this.connectionid+'/service-contract-detail').subscribe(data=>{
          this.connectionData = data['result'];
          this.getSubareaId = this.connectionData.consumer_id.billing_sub_area.id_string;
          console.log("???????????????????????????????????",this.connectionData)
          this.apiService.get('utility/'+this.utilityIdString+'/premise/list?subarea_id='+this.getSubareaId).subscribe(data=>{
            this.premiselist = data.results;
          }) 
        })
    })
  }

}
