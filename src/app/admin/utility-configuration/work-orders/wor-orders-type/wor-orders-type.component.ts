import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { FilterService } from '../../../../common/filter/filter.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../../common-services/session-service/session.service';
declare var $ : any;
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-wor-orders-type',
  templateUrl: './wor-orders-type.component.html',
  styleUrls: ['./wor-orders-type.component.scss'],
  providers: [ErrorMessage]
})
export class WorOrdersTypeComponent implements OnInit {

  constructor(private fb: FormBuilder,private filterService : FilterService,private formBuilder: FormBuilder,private apiService : ApiService, private sanitizer: DomSanitizer,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('utility/'+ this.utility_id_string_admin +'/document/list').subscribe(data=>{
      this.imageDetailList = data.results
      for(let item of this.imageDetailList){
        var str1 = item.document_generated_name
      }
      this.imageUrl = str1
      console.log("URL",this.imageUrl)
    },(err) => {
      this.imageUrl='../../../assets/images/no-image-available.png';
      this.showButton = true;
    });
    
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/rules/list').subscribe(data => {
      this.service_rulesList = data;
    }) 
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_type/list').subscribe(data => {
      this.material_typeList = data;
    }) 
    // this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_subtype/list').subscribe(data => {
    //   this.material_subtypeList = data;
    // }) 
    // this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_name/list').subscribe(data => {
    //   this.material_nameList = data;
    // }) 
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/list').subscribe(data=>{
      this.work_orderList = data
    })
    
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.productList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data=>{
      this.utility_work_orderTypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list').subscribe(data=>{
      this.utility_work_orderSubTypeList = data;
    })

    this.apiService.get('utility/'+this.utilityIdString+'/skill/list').subscribe(data=>{
      this.utility_skillList = data;
    })

     // Task details form code start
     this.taskDetailsForm = this.formBuilder.group({
      taskControl: this.formBuilder.array(
        [this.formBuilder.group({task:[null,[Validators.required]]})]
        ),
    });
    // Task details form code end


     // Task details Edit form code start
     this.taskDetailsFormEdit = this.formBuilder.group({
      taskControlEdit: this.formBuilder.array(
        [this.formBuilder.group({taskEdit:[null,[Validators.required]]})]
        ),
    });
    // Task details Edit form code end

     // material type form code start
     this.materialTypeDetailsForm = this.formBuilder.group({
      materialTypeControl: this.formBuilder.array(
        [this.formBuilder.group({material_name:[null],materialNameControl: [null, [Validators.required]],typeControl: [null, [Validators.required]],materialSubTypeControl: [null, [Validators.required]]})]
        ),
    });
    // material type form code end

    // material type form code start
     this.materialTypeDetailsFormEdit = this.formBuilder.group({
      materialTypeControlEdit: this.formBuilder.array(
        [this.formBuilder.group({material_nameEdit:[null,Validators.required],materialNameControlEdit: [null, [Validators.required]],typeControlEdit: [null, [Validators.required]],materialSubTypeControlEdit: [null, [Validators.required]]})]
        ),
    });
    // material type form code end

    this.parameterDetailsForm = this.formBuilder.group({
      parameterTypeControl: this.formBuilder.array(
        [this.formBuilder.group({parameterName:[null,Validators.required],parameterType:[null,Validators.required],parameterUnit:[null,Validators.required]})]
        ),
    });

    this.parameterDetailsFormEdit = this.formBuilder.group({
      parameterTypeControlEdit: this.formBuilder.array(
        [this.formBuilder.group({parameterNameEdit:[null,Validators.required],parameterTypeEdit:[null,Validators.required],parameterUnitEdit:[null,Validators.required]})]
        ),
    });

     

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      serviceTypeControl: [null,],
      serviceSubTypeControl: [null,],
      descriptionControl: [null, [Validators.required]],
      urlControl: [null, [Validators.required]],
      rulesControl: [null, [Validators.required]],
      nameControl: [null, [Validators.required]],
      workOrderTypeControl:[null, [Validators.required]],
      workOrderSubTypeControl:[null, [Validators.required]],
      product_details:[null, [Validators.required]],
      skill:[null, [Validators.required]],
      rateControl:[null, [Validators.required]],
      taxControl:[null, [Validators.required]],
      time_add:[null, [Validators.required]],
      symbol_details:[null, [Validators.required]],
      instructionsControl:[null, [Validators.required]]

    });

    // Applicant details form code edit start
    this.applicantDetailsFormEdit = this.formBuilder.group({
      serviceTypeControlEdit: [null,],
      serviceSubTypeControlEdit: [null,],
      descriptionControlEdit: [null, [Validators.required]],
      urlControlEdit: [null, [Validators.required]],
      rulesControlEdit: [null, [Validators.required]],
      nameControlEdit: [null, [Validators.required]],
      workOrderTypeControlEdit:[null, [Validators.required]],
      workOrderSubTypeControlEdit:[null, [Validators.required]],
      product_detailsEdit:[null, [Validators.required]],
      skillEdit:[null, [Validators.required]],
      rateControlEdit:[null, [Validators.required]],
      taxControlEdit:[null, [Validators.required]],
      time:[null, [Validators.required]],
      symbol_details:[null, [Validators.required]]


    });

    // service Details edit form code start
    this.serviceDetailsFormEdit = this.formBuilder.group({
      serviceControlEdit: this.formBuilder.array(
        [this.formBuilder.group({service_details_edit:[null]})]
        ),
    });
    // service Details edit form code end
   }

    // Object for error messages start
    message = new ErrorMessage() 
    // Object for error messages start

  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  dtOptions: any = {};
  imageDetailList=[];
  showButton:boolean = false;
  utility_id_string_admin = this.sessionService.getter("utility_id_string_admin")
  imageUrl;
  buttonUrl
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPen = faPen;
  faStar = faStar;
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
  addType: FormGroup;
  addType1: FormGroup;
  searchText;
  showoption=false;
  showDropdown1=false;
  showMaterial=false;
  showSkill=false;
  showTask=false;
  skillDetailsForm: FormGroup;
  taskDetailsForm: FormGroup;
  parameterDetailsFormEdit
  taskDetailsFormEdit: FormGroup;
  materialTypeDetailsForm: FormGroup;
  materialSubTypeDetailsForm: FormGroup;
  materialNameDetailsForm: FormGroup;
  applicantDetailsForm: FormGroup;
  serviceDetailsFormEdit: FormGroup;
  parameterDetailsForm:FormGroup;
  applicantDetailsFormEdit:FormGroup;
  materialTypeDetailsFormEdit:FormGroup;
  service_typeList:any=[];
  productList:any=[];
  service_details_list_edit:any=[];
  service_details_list:any=[]
  service_subtypeList:any=[];
  service_rulesList:any=[];
  material_typeList:any=[];
  material_nameList:any=[];
  tasks_details_list:any=[];
  utility_skillList:any=[];
  utility_work_orderTypeList:any=[];
  utility_work_orderSubTypeList:any=[];
  material_subtypeList:any=[];
  service_serviceList:any=[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  work_orderList:any=[];
  parameters_details_list:any=[];
  parameters_details_list_edit:any=[];
  tasks_details_list_edit:any=[];
  skills_details_list:any=[];
  skills_details_list_edit:any=[];
  rules_details_list:any=[];
  rules_details_list_edit:any=[];
  material_type_filter_list:any=[];
  material_sub_type_filter_list:any=[];
  material_type_filter_list_edit:any=[];
  material_sub_type_filter_list_edit:any=[];
  materialDetailsFormSubmitted = false;
  applicantDetailsFormSubmitted = false;
  taskDetailsFormSubmitted = false;
  parameterDetailsFormSubmitted = false;
  materialDetailsFormEditSubmitted = false;
  applicantDetailsFormEditSubmitted = false;
  taskDetailsFormEditSubmitted = false;
  parameterDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd:boolean = false;
  showTable: boolean = true;
  isDisplay=false;
  isRules = false;
  isSkills = false;
  isTasks = false;
  isMaterials = false;
  isParameters = false;
  isInstructions = false;
  trustedDashboardUrl : SafeUrl;
  safeSrc: SafeResourceUrl;
  toggleDisplay(){
    this.isDisplay=!this.isDisplay;
  }

  toggleSkills(){
    
    this.isSkills = !this.isSkills;
  }

  toggleRules(){
    this.isRules = !this.isRules;
  }

  toggleTasks(){
    this.isTasks=!this.isTasks;
  }

  toggleMaterial(){
    this.isMaterials=!this.isMaterials;
  }

  toggleParameter(){
    this.isParameters=!this.isParameters;
  }

  toggleInstructions(){
    this.isInstructions = !this.isInstructions;

  }

  spinners = true;
  seconds = false;

  onEditButtonClick(){
    $('#editwt').modal('show');
  }
 
  
  


  workOrderTypeChange(){
  let work_order_type_id_string = this.applicantDetailsForm.value.workOrderTypeControl.id_string;
  console.log(work_order_type_id_string)
  // Zones dropdown api call start
  this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list?utility_work_order_type_id='+work_order_type_id_string).subscribe(data=>{
    this.utility_work_orderSubTypeList = data;
  },(err) => {
    this.utility_work_orderSubTypeList = '';
    alert("Work Order Sub Type not available for Selected Type.")
  })
  // Zone categories dropdown api call end
  }

  workOrderTypeEditChange(){
    let work_order_type_id_string = this.applicantDetailsFormEdit.value.workOrderTypeControlEdit.id_string;
    console.log(work_order_type_id_string)
    // Zones dropdown api call start
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list?utility_work_order_type_id='+work_order_type_id_string).subscribe(data=>{
      this.utility_work_orderSubTypeList = data;
    },(err) => {
      this.utility_work_orderSubTypeList = '';
      alert("Work Order Sub Type not available for Selected Type.")
    })
    // Zone categories dropdown api call end
    }

  onMaterialTypeChange(){
    for(let materials of this.materialTypeDetailsForm.value.materialTypeControl){
      this.material_type_filter_list.push(
        {
           type_id_string:materials.typeControl.id_string,
        }
      );
    }
    let material_type_id_string = this.material_type_filter_list.slice(-1)[0].type_id_string;
    console.log(material_type_id_string)
    // Zones dropdown api call start
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_subtype/list?material_type_id='+material_type_id_string).subscribe(data=>{
      this.material_subtypeList = data
    })
  // Zone categories dropdown api call end
  }

  onMaterialTypeEditChange(){
    for(let materials of this.materialTypeDetailsFormEdit.value.materialTypeControlEdit){
      this.material_type_filter_list_edit.push(
        {
           type_id_string:materials.typeControlEdit.id_string,
        }
      );
    }
    let material_type_id_string = this.material_type_filter_list_edit.slice(-1)[0].type_id_string;
    console.log(material_type_id_string)
    // Zones dropdown api call start
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_subtype/list?material_type_id='+material_type_id_string).subscribe(data=>{
      this.material_subtypeList = data
    })
  // Zone categories dropdown api call end
  }

  onMaterialSubTypeChange(){
    for(let materials of this.materialTypeDetailsForm.value.materialTypeControl){
      this.material_sub_type_filter_list.push(
        {
           sub_type_id_string:materials.materialSubTypeControl.id_string,
          //  sub_type_id_string:materials.typeControl.materialSubTypeControl.id_string,
          //  name_id_string:materials.typeControl.materialNameControl.id_string

        }
      );
    }
    
    let material_sub_type_id_string = this.material_sub_type_filter_list.slice(-1)[0].sub_type_id_string;
    console.log(material_sub_type_id_string)
    // Zones dropdown api call start
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_name/list?material_subtype_id='+material_sub_type_id_string).subscribe(data=>{
      this.material_nameList = data
    })
  // Zone categories dropdown api call end
  }

  onMaterialSubTypeEditChange(){
    for(let materials of this.materialTypeDetailsFormEdit.value.materialTypeControlEdit){
      this.material_sub_type_filter_list_edit.push(
        {
           sub_type_id_string:materials.materialSubTypeControlEdit.id_string,
          //  sub_type_id_string:materials.typeControl.materialSubTypeControl.id_string,
          //  name_id_string:materials.typeControl.materialNameControl.id_string

        }
      );
    }
    
    let material_sub_type_id_string = this.material_sub_type_filter_list_edit.slice(-1)[0].sub_type_id_string;
    console.log(material_sub_type_id_string)
    // Zones dropdown api call start
    this.apiService.get('work-order/utility/'+this.utilityIdString+'/material_name/list?material_subtype_id='+material_sub_type_id_string).subscribe(data=>{
      this.material_nameList = data
    })
  // Zone categories dropdown api call end
  }

  // material details form control start
  get md() { return this.materialTypeDetailsForm.controls; }
  // material details form control end

  // material details form edit control start
  get mde() { return this.materialTypeDetailsFormEdit.controls; }
  // material details form edit control end

  // applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // applicant details form control end

  // applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // applicant details form control end

  // applicant details form control start
  get td() { return this.taskDetailsForm.controls; }
  // applicant details form control end

  // applicant details form control start
  get tde() { return this.taskDetailsFormEdit.controls; }
  // applicant details form control end

  // applicant details form control start
  get pd() { return this.parameterDetailsForm.controls; }
  // applicant details form control end

  // applicant details form control start
  get pde() { return this.parameterDetailsFormEdit.controls; }
  // applicant details form control end
  view_id_string;
  work_order_view_List:any=null;
  first_name_splitted;
  first_name_c;
  last_name_c;
  onViewClickEvent(item:any){
    this.view_id_string = item.id_string;
    this.apiService.get('work-order/utility/service/'+this.view_id_string).subscribe(data=>{
    this.work_order_view_List = data;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.work_order_view_List.results.json_obj.url);
    this.trustedDashboardUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.work_order_view_List.results.json_obj.url);
    this.first_name = data.results.expert_name;
    this.first_name_splitted = this.first_name.split(" ");
    this.first_name_c = this.first_name_splitted[0].charAt(0)
    this.last_name_c = this.first_name_splitted[1].charAt(0)
    console.log("SPLITTED",this.first_name_splitted[0].charAt(0))


      console.log('View List result:',data);
  })
}

onViewCloseClick(){
  console.log("CLICKED")
  $('#view_work_order').modal('hide');

}

  

  get Tasks() {
    return this.taskDetailsForm.get('taskControl') as FormArray;
  }

  get TasksEdit() {
    return this.taskDetailsFormEdit.get('taskControlEdit') as FormArray;
  }



  get MaterialType() {
    return this.materialTypeDetailsForm.get('materialTypeControl') as FormArray;
  }

  get MaterialTypeEdit() {
    return this.materialTypeDetailsFormEdit.get('materialTypeControlEdit') as FormArray;
  }

  get ParameterDetail() {
    return this.parameterDetailsForm.get('parameterTypeControl') as FormArray;
  }

  get ParameterDetailEdit() {
    return this.parameterDetailsFormEdit.get('parameterTypeControlEdit') as FormArray;
  }



  addTaskRow(){
    this.Tasks.push(this.formBuilder.group({task:[null,Validators.required]}));
  }

  addTaskRowEdit(){
    this.TasksEdit.push(this.formBuilder.group({taskEdit:[null, Validators.required]}));
  }

  

  addMaterialTypeRow(){
    this.MaterialType.push(this.formBuilder.group({material_name:[null,Validators.required],materialNameControl: [null, [Validators.required]],typeControl: [null, [Validators.required]],materialSubTypeControl: [null, [Validators.required]]}));
  }

  addMaterialTypeRowEdit(){
    this.MaterialTypeEdit.push(this.formBuilder.group({material_nameEdit:[null, Validators.required],materialNameControlEdit: [null, [Validators.required]],typeControlEdit: [null, [Validators.required]],materialSubTypeControlEdit: [null, [Validators.required]]}))
  }

  addParameterDetailRow(){
    this.ParameterDetail.push(this.formBuilder.group({parameterName:[null, Validators.required],parameterType:[null, Validators.required],parameterUnit:[null, Validators.required]}));

  }

  addParameterDetailRowEdit(){
    this.ParameterDetailEdit.push(this.formBuilder.group({parameterNameEdit:[null,Validators.required],parameterTypeEdit:[null,Validators.required],parameterUnitEdit:[null, Validators.required]}));

  }


  
  
  
  

 

  removeParameterRow(index){
    if (index != 0){
      this.ParameterDetail.removeAt(index);
    }else{
      return false
    }

  }

  removeParameterRowEdit(index){
    if (index != 0){
      this.ParameterDetailEdit.removeAt(index);
    }else{
      return false
    }

  }

  removeMaterialsRow(index){
    if (index != 0){
      this.MaterialType.removeAt(index);
    }else{
      return false
    }

  }

  removeMaterialsRowEdit(index){
    if (index != 0){
      this.MaterialTypeEdit.removeAt(index);
    }else{
      return false
    }

  }

  removeTasksRow(index){
    if (index != 0){
      this.Tasks.removeAt(index);
    }else{
      return false
    }
  }

  removeTasksRowEdit(index){
    if (index != 0){
      this.TasksEdit.removeAt(index);
    }else{
      return false
    }
  }

  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.materialTypeDetailsForm.reset();
    this.materialTypeDetailsFormEdit.reset();
    this.taskDetailsFormEdit.reset();
    this.taskDetailsForm.reset();
    this.materialDetailsFormSubmitted = false;
    this.applicantDetailsFormSubmitted = false;
    this.taskDetailsFormSubmitted = false;
    this.parameterDetailsFormSubmitted = false;
    this.materialDetailsFormEditSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.taskDetailsFormEditSubmitted = false;
    this.parameterDetailsFormEditSubmitted = false;
    this.parameterDetailsFormEdit.reset();
    this.parameterDetailsForm.reset();
    this.disableAdd = false;

  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.materialTypeDetailsForm.reset();
    this.materialTypeDetailsFormEdit.reset();
    this.taskDetailsFormEdit.reset();
    this.taskDetailsForm.reset();
    this.materialDetailsFormSubmitted = false;
    this.applicantDetailsFormSubmitted = false;
    this.taskDetailsFormSubmitted = false;
    this.parameterDetailsFormSubmitted = false;
    this.materialDetailsFormEditSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.taskDetailsFormEditSubmitted = false;
    this.parameterDetailsFormEditSubmitted = false;
    this.parameterDetailsFormEdit.reset();
    this.parameterDetailsForm.reset();
    this.disableAdd = false;

  }

  selectedSymbol:any;
  symbol = [
  {name: "Hydrant Flushing", src:"../../../../assets/images/service-card-plumber-bg1.png"},
  {name: "Repair", src: "../../../../assets/images/service-card-bg1.png"},
  {name: "Lab Test", src:"../../../../assets/images/service-card-bg2.png"},
  {name: "Service", src: "../../../../assets/images/service-card-bg3.png"},
  ];

  symbolChange(){
    this.selectedSymbol = this.applicantDetailsForm.value.symbol_details.src;
    console.log("SYMBOL",this.selectedSymbol)
  }

  goToLink(url: string){
    window.open(url, "_blank");
}



  files: File[] = []; 
  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
  }
  onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
  }

  onServiceSubmit(){
    console.log(this.md,this.pd,this.td)

    this.materialDetailsFormSubmitted = true;
    this.applicantDetailsFormSubmitted = true;
    this.taskDetailsFormSubmitted = true;
    this.parameterDetailsFormSubmitted = true;

    for(let services of this.applicantDetailsForm.value.product_details){
      this.service_details_list.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    for(let parameters of this.parameterDetailsForm.value.parameterTypeControl){
      this.parameters_details_list.push(
        {
          name:parameters.parameterName,
          type: parameters.parameterType,
          unit:parameters.parameterUnit
        }
      );
    }

    for(let skills of this.applicantDetailsForm.value.skill){
      this.skills_details_list.push(
        {
          skill:skills.skill,
          id_string: skills.id_string,
        }
      );
    }
    

    for(let tasks of this.taskDetailsForm.value.taskControl){
      this.tasks_details_list.push(
        {
          task:tasks.task
        }
      );
    }

    for(let rules of this.applicantDetailsForm.value.rulesControl){
      this.rules_details_list.push(
        {
          name:rules.rule,
          id_string:rules.id_string

        }
      );
    }
    let data = {
       
        name:this.applicantDetailsForm.value.nameControl,
        tenant_id:this.sessionService.getter("tenant_id_string"),
        utility_id:this.sessionService.getter("utility_id_string_admin"),
        description:this.applicantDetailsForm.value.descriptionControl,
        base_rate:this.applicantDetailsForm.value.rateControl,
        tax_rate:this.applicantDetailsForm.value.taxControl,
        service_obj:this.service_details_list,
        instructions:this.applicantDetailsForm.value.instructionsControl,
        utility_product_id:1,
        utility_work_order_type_id:this.applicantDetailsForm.value.workOrderTypeControl.id_string,
        utility_work_order_sub_type_id:this.applicantDetailsForm.value.workOrderSubTypeControl.id_string,
        json_obj:{
          skill_details:this.skills_details_list,
          task:this.tasks_details_list,
          rule:this.rules_details_list,
          material_details:this.materialTypeDetailsForm.value.materialTypeControl,
          parameter_details:this.parameters_details_list,
          url:this.applicantDetailsForm.value.urlControl
        },

         
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log(this.ad)
      console.log("Data",data);
      this.apiService.post('work-order/utility/service', data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.applicantDetailsForm.reset();
        this.materialTypeDetailsForm.reset();
        this.taskDetailsForm.reset();
        this.materialDetailsFormSubmitted = false;
        this.applicantDetailsFormSubmitted = false;
        this.taskDetailsFormSubmitted = false;
        this.parameterDetailsFormSubmitted = false;
        this.parameterDetailsForm.reset();
        $('#addwt').modal('hide');
        this.service_details_list = []
        this.skills_details_list = []
        this.tasks_details_list = []
        this.rules_details_list = []
        this.parameters_details_list = []
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }

  onServiceEditSubmit(){
    console.log(this.mde,this.pde,this.tde)
    this.materialDetailsFormEditSubmitted = true;
    this.applicantDetailsFormEditSubmitted = true;
    this.taskDetailsFormEditSubmitted = true;
    this.parameterDetailsFormEditSubmitted = true;
    for(let services of this.applicantDetailsFormEdit.value.product_detailsEdit){
      this.service_details_list_edit.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    for(let parameters of this.parameterDetailsFormEdit.value.parameterTypeControlEdit){
      this.parameters_details_list_edit.push(
        {
          name:parameters.parameterNameEdit,
          type: parameters.parameterTypeEdit,
          unit:parameters.parameterUnitEdit
        }
      );
    }

    for(let skills of this.applicantDetailsFormEdit.value.skillEdit){
      this.skills_details_list_edit.push(
        {
          skill:skills.skill,
          id_string: skills.id_string,
        }
      );
    }
    

    for(let tasks of this.taskDetailsFormEdit.value.taskControlEdit){
      this.tasks_details_list_edit.push(
        {
          task:tasks.taskEdit
        }
      );
    }

    for(let rules of this.applicantDetailsFormEdit.value.rulesControlEdit){
      this.rules_details_list_edit.push(
        {
          name:rules.ruleEdit,
          id_string:rules.id_string

        }
      );
    }
    let data = {
       
        name:this.applicantDetailsFormEdit.value.nameControlEdit,
        tenant_id:this.sessionService.getter("tenant_id_string"),
        utility_id:this.sessionService.getter("utility_id_string_admin"),
        description:this.applicantDetailsFormEdit.value.descriptionControlEdit,
        base_rate:this.applicantDetailsFormEdit.value.rateControlEdit,
        tax_rate:this.applicantDetailsFormEdit.value.taxControlEdit,
        service_obj:this.service_details_list_edit,
        utility_product_id:1,
        utility_work_order_type_id:this.applicantDetailsFormEdit.value.workOrderTypeControlEdit.id_string,
        utility_work_order_sub_type_id:this.applicantDetailsFormEdit.value.workOrderSubTypeControlEdit.id_string,
        json_obj:{
          skill_details:this.skills_details_list_edit,
          task:this.tasks_details_list_edit,
          rule:this.rules_details_list_edit,
          material_details:this.materialTypeDetailsFormEdit.value.materialTypeControlEdit,
          parameter_details:this.parameters_details_list_edit,
          url:this.applicantDetailsFormEdit.value.urlControlEdit
        },
    }

    if (this.applicantDetailsFormEdit.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('work-order/utility/service/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.editedSuccessfullyToast=true;
        $('#editwt').modal('hide');
        this.service_details_list_edit = []
        this.skills_details_list_edit = []
        this.tasks_details_list_edit = []
        this.rules_details_list_edit = []
        this.parameters_details_list_edit = []
        this.applicantDetailsFormEdit.reset();
        this.materialTypeDetailsFormEdit.reset();
        this.taskDetailsFormEdit.reset();
        this.materialDetailsFormEditSubmitted = false;
        this.applicantDetailsFormEditSubmitted = false;
        this.taskDetailsFormEditSubmitted = false;
        this.parameterDetailsFormEditSubmitted = false;
        this.parameterDetailsFormEdit.reset();
          
        }
      },(err) => {
        this.exceptionToast=true;
  
      });
    }
  }

  onAddType(){
    this.apiService.get('utility/'+this.utilityIdString+'/service_type/list').subscribe(data => {
      this.service_typeList = data;
    }) 
    console.log("Clicked");
  }

  onAddSubType(){
    this.apiService.get('utility/'+this.utilityIdString+'/service_subtype/list').subscribe(data => {
      this.service_subtypeList = data;
    }) 
  }



  
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedPagination:any;
  pagination = [
  {id: 1, name: '10'},
  {id: 2, name: '20'},
  ];


  blocks = [
    {
      name:       "Work Order Name",
    },
    {
        name:       "Work Order Type",
    },
    {
        name:       "Work Order Sub Type",
    },
    {
        name:       "Created By",
    },
    {
        name:       "Created Date",
    },
    {
      name:       "Action",
    },

  ]


addDropdown(){
  this.showMaterial=true;
}

addSkill(){
  this.showSkill=true;
}

addTask(){
  this.showTask=true;
}

dataSet = [

]


  
  first_name;
  last_name;
  ngOnInit(): void {
    this.selectedSymbol = this.symbol[0].src
    this.addType = this.fb.group({            
      servicetype: '',
    });
    this.addType1 = this.fb.group({            
      servicetype1: '',
    });
    const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing:false,
      //   dom: 'Bfrtip',
      //   buttons: [
      //     'copy', 'csv', 'excel', 'print'
      // ],
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
          
          that.apiService.get(`work-order/utility/${that.utilityIdString}/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              
              that.dataSet = resp.results;

              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
        },
      };
  }
  

}
