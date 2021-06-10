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
  selector: 'app-complaints-approve',
  templateUrl: './complaints-approve.component.html',
  styleUrls: ['./complaints-approve.component.scss']
})
export class ComplaintsApproveComponent implements OnInit {

  @Input() trigger
  searchText;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  utilityIdString = this.sessionService.getter("utility_id_string");
  workOrderTypelist:any=[];
  workOrderSubTypelist:any=[];
  workOrderMaster:any=[];
  complaintData:any=[];
  complaintid;
  complaintapprove: FormGroup;
  remarkAdd: FormGroup;
  remarkSubmitted = false;
  workType : any[] = [];
  workMaster : any[] = [];
  workOrderDetailsForm: FormGroup;
  workOrderDetailFormSubmitted = false;
  addedSuccessfullyToast=false;
  updateToast=false;
  errortoast=false;
  rejectToast=false;
  holdToast=false;
  onApprove=false;
  onRejectOrHold=false;
  rejectAndHoldToast=false;
  newerrortoast = false;

   // work order details form control start
   get ad() { return this.workOrderDetailsForm.controls; }
   // work order details form control end

   get rm() { return this.remarkAdd.controls; }

   get ca() {return this.complaintapprove.controls; }

   get workItems() {
    return this.workOrderDetailsForm.get('workItemsControl') as FormArray;
  }

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

    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data=>{
      this.workOrderTypelist = data;
      console.log(this.workOrderTypelist.results)
    })
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list').subscribe(data=>{
      this.workOrderSubTypelist = data;
      console.log(this.workOrderSubTypelist.results)
    })
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/list').subscribe(data=>{
      this.workOrderMaster = data;
      console.log(this.workOrderMaster.results)
    })

        // Applicant details form code start
      this.workOrderDetailsForm = this.formbuilder.group({
        workItemsControl: this.formbuilder.array(
          [this.formbuilder.group({
            workOrderType: [null, [Validators.required]],
            workOrderSubType: [null, [Validators.required]],
            workOrderMaster: [null, [Validators.required]]            
          })]
        ),
      });

      this.remarkAdd = this.formbuilder.group({  
        remarkItemsControl: this.formbuilder.array(
          [this.formbuilder.group({
            remark: [null, [Validators.required]],           
          })]
        ),          
      });


  }

  onCancel(){
    this.workOrderDetailsForm.reset();
    this.remarkAdd.reset();
    this.complaintapprove.reset();
  }

  onWorkorderType(index){
    this.workType=[]
    let type_id_string = this.workItems.at(index).value.workOrderType.id_string
      console.log("____________________________",type_id_string)
      this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list?utility_work_order_type_id='+type_id_string).subscribe(data=>{
        console.log(data)
        for(let item of data['results']){
          this.workType.push({
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
  work_order_master_id;
  remark_add;
  yesOrno;
  onAddServicedata(){
    this.onApprove=true;
    if(this.complaintapprove.invalid){
      this.newerrortoast=true;
      return;
    }
    else{
      console.log("|||||||||||||||||||",this.complaintapprove.value.complaintType)
    
    if(this.complaintapprove.value.complaintType == "yes"){
      if(this.workOrderDetailsForm.invalid){
        this.newerrortoast=true;
        return;
      }else{
        console.log("??????Yesssssssssssssss????????")
      this.remarkSubmitted = true;
      this.workOrderDetailFormSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      console.log("<<<<<<<<>>>>>>>>>>>>>>",this.remark_add)
    

      for(let item of this.workItems.controls){
        this.work_order_master_id=item.value.workOrderMaster.id_string
      }

      let data ={
        consumer_service_contract_detail_id:this.complaintData.consumer_service_contract_detail_id.id_string,
        tenant_id:this.sessionService.getter("tenant_id_string"),
        utility_id:this.sessionService.getter("utility_id_string"),
        work_order_master_id:this.work_order_master_id,
        sa_user_remark:this.remark_add
      }
     
        console.log("Data",data);
        this.apiService.post('complaint/'+this.complaintData.id_string+'/approve',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          this.addedSuccessfullyToast = true;
          // setTimeout(()=>{
          //   window.location.reload()
          //   // this.router.navigateByUrl('/consumer/complaints-processing');
          // }, 1200);
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/complaints-processing']);
            });
          }, 1200);
          this.apiService.get('complaint/utility/'+this.utilityIdString+'/list').subscribe(data=>{
            console.log("SUCCESS")
            $('#complaintApproveModal').modal('hide');
            this.workOrderDetailsForm.reset();
            this.remarkAdd.reset();
            this.complaintapprove.reset();
          })
        },
        error=>{
          console.log("this is an error===",error)
          this.errortoast = true;
        });
      }
    }else if(this.complaintapprove.value.complaintType == "no"){
      this.remarkSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      let data ={
        consumer_service_contract_detail_id:this.complaintData.consumer_service_contract_detail_id.id_string,
        consumer_complaint_master_id:this.complaintData.consumer_complaint_master_id.id_string,
        complaint_type_id:this.complaintData.complaint_sub_type.complaint_type.id_string,
        complaint_sub_type_id:this.complaintData.complaint_sub_type.id_string,
        closure_remark:this.remark_add,
        state:6
      }
      console.log("Data",data);
      this.apiService.put('complaint/'+this.complaintData.id_string+'/',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        this.updateToast = true;
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/complaints-processing']);
            });
          }, 1200);
        this.apiService.get('complaint/utility/'+this.utilityIdString+'/list').subscribe(data=>{
          console.log("SUCCESS")
          $('#complaintApproveModal').modal('hide');
          this.workOrderDetailsForm.reset();
          this.remarkAdd.reset();
          this.complaintapprove.reset();
        })
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });

      console.log("<<<<<<<<>>>>>>>>>>>>>>",this.remark_add)
      console.log("+++++NOOOOOOOOOOO+++++++")
      console.log("!!!!!!!!!!!!!!!!!!",this.complaintData.consumer_service_contract_detail_id.id_string)
      console.log("+++++++++++++++++++",this.complaintData.consumer_complaint_master_id.id_string)
      console.log("===========subtype=========",this.complaintData.complaint_sub_type.id_string)
      console.log("===========type=========",this.complaintData.complaint_sub_type.complaint_type.id_string)

    }

    }
      
    
  }


  onReject(){
    this.onRejectOrHold=true;
    if (this.remarkAdd.invalid) {
      this.rejectAndHoldToast=true;
      return;
    }else{
      this.remarkSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      let data ={
        closure_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('complaint/'+this.complaintData.id_string+'/reject',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        this.rejectToast = true;
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/complaints-processing']);
            });
          }, 1200);
        this.apiService.get('complaint/utility/'+this.utilityIdString+'/list').subscribe(data=>{
          console.log("SUCCESS")
          $('#complaintApproveModal').modal('hide');
          this.workOrderDetailsForm.reset();
          this.remarkAdd.reset();
          this.complaintapprove.reset();
        })
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });
    }   
  }

  onHold(){
    this.onRejectOrHold=true;
    if (this.remarkAdd.invalid) {
      this.rejectAndHoldToast=true;
      return;
    }else{
      this.remarkSubmitted = true;
      for(let item of this.remarkItems.controls){
        this.remark_add=item.value.remark
      }
      let data ={
        closure_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('complaint/'+this.complaintData.id_string+'/hold',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        this.holdToast = true;
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/complaints-processing']);
            });
          }, 1200);
        this.apiService.get('complaint/utility/'+this.utilityIdString+'/list').subscribe(data=>{
          console.log("SUCCESS")
          $('#complaintApproveModal').modal('hide');
          this.workOrderDetailsForm.reset();
          this.remarkAdd.reset();
          this.complaintapprove.reset();
        })
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });
    }
    

  }

  ngOnInit(): void {  

    this.complaintapprove = this.formbuilder.group({            
      complaintType: [null, [Validators.required]],
    });


    this.filterService.getButtonEventByIdString().subscribe(detailVal=>{
      this.complaintid=detailVal.id_string

      console.log("+++++++++++++complaint id string++++++++++++++++++",this.complaintid)
      
        $('#complaintApproveModal').modal('show');  
        this.apiService.get('complaint/'+this.complaintid).subscribe(data=>{
          this.complaintData = data['result'];
          console.log("???????????????????????????????????",this.complaintData)
        })                 
    })

  }

}
