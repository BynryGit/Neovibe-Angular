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
  selector: 'app-transfer-approve',
  templateUrl: './transfer-approve.component.html',
  styleUrls: ['./transfer-approve.component.scss']
})
export class TransferApproveComponent implements OnInit {

  @Input() trigger
  searchText;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  utilityIdString = this.sessionService.getter("utility_id_string");
  remarkAdd: FormGroup;
  transferid;
  transferData:any=[];
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
      this.transferid=detailVal.id_string

      console.log("+++++++++++++complaint id string++++++++++++++++++",this.transferid)
      
        $('#transferApproveModal').modal('show');  
        this.apiService.get('work-order/service-appointment/'+this.transferid).subscribe(data=>{
          this.transferData = data['results'];
          console.log("???????????????????????????????????",this.transferData)
        })                 
    })
  }

  //Transfer request reject start
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
        sa_user_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('work-order/service-appointment/'+this.transferData.id_string+'/reject',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        
        $('#transferApproveModal').modal('hide');
        this.rejectToast = true;
        this.remarkAdd.reset();
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/transfer-processing']);
            });
          }, 1200);
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });

      }
      

  }
  //Transfer request reject end

  //Transfer request hold start
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
        sa_user_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('work-order/service-appointment/'+this.transferData.id_string+'/hold',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        
        $('#transferApproveModal').modal('hide');
        this.holdToast= true;
        this.remarkAdd.reset();
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/transfer-processing']);
            });
          }, 1200);
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });

      }
    

  }
  //Transfer request hold end

  //Transfer request Approve start
  onApprove(){
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
        sa_user_remark:this.remark_add        
      }

      console.log("Data",data);
      this.apiService.put('work-order/service-appointment/'+this.transferData.id_string+'/approve',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        
        $('#transferApproveModal').modal('hide');
        this.approveToast= true;
        this.remarkAdd.reset();
        // setTimeout(()=>{
        //   window.location.reload()
        //   // this.router.navigateByUrl('/consumer/complaints-processing');
        // }, 1200);
        setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/consumer/transfer-processing']);
            });
          }, 1200);
      },
      error=>{
        console.log("this is an error===",error)
        this.errortoast = true;
      });
      }
    

  }
  //Transfer request Approve end

}
