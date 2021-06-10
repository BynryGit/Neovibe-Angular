import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl,FormArray } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-meter-data-task-template',
  templateUrl: './meter-data-task-template.component.html',
  styleUrls: ['./meter-data-task-template.component.scss'],
  providers: [ErrorMessage]
})
export class MeterDataTaskTemplateComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('meter-data/'+this.utilityIdString+'/task-template/list').subscribe(data=>{
      this.task_templateList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      taskNameControl: [null, [Validators.required,Validators.pattern("[a-zA-Z ]*$"),Validators.maxLength(20),this.noWhitespaceValidator]],
      meterControl: this.formBuilder.array(
        [this.formBuilder.group({meterDetailNameControl:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControl:[null,Validators.required],colTypeNameControl:[null,Validators.required]})],
        ),
      parameterControl: this.formBuilder.array(
          [this.formBuilder.group({parameterNameControl:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControl:[null,Validators.required],colTypeNameControl:[null,Validators.required]})],
          ),

    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      taskNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      meterControlEdit: this.formBuilder.array(
        [this.formBuilder.group({meterDetailNameControlEdit:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControlEdit:[null,Validators.required],colTypeNameControlEdit:[null,Validators.required]})],
        ),
      parameterControlEdit: this.formBuilder.array(
          [this.formBuilder.group({parameterNameControlEdit:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControlEdit:[null,Validators.required],colTypeNameControlEdit:[null,Validators.required]})],
          ),
    });
   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get MeterControl() {
    return this.applicantDetailsForm.get('meterControl') as FormArray;
  }

  get ParameterControl() {
    return this.applicantDetailsForm.get('parameterControl') as FormArray;
  }

  addMeterDetailsRow(){
    this.MeterControl.push(this.formBuilder.group({meterDetailNameControl:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControl:[null,Validators.required],colTypeNameControl:[null,Validators.required]}));
  }

  addParameterDetailsRow(){
    this.ParameterControl.push(this.formBuilder.group({parameterNameControl:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControl:[null,Validators.required],colTypeNameControl:[null,Validators.required]}));
  }

  get MeterControlEdit() {
    return this.applicantDetailsFormEdit.get('meterControlEdit') as FormArray;
  }

  get ParameterControlEdit() {
    return this.applicantDetailsFormEdit.get('parameterControlEdit') as FormArray;
  }

  addMeterDetailsRowEdit(){
    this.MeterControlEdit.push(this.formBuilder.group({meterDetailNameControlEdit:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControlEdit:[null,Validators.required],colTypeNameControlEdit:[null,Validators.required]}));
  }

  addParameterDetailsRowEdit(){
    this.ParameterControlEdit.push(this.formBuilder.group({parameterNameControlEdit:[null,[Validators.required,Validators.pattern("[a-zA-Z ]*$")]],dataTypeNameControlEdit:[null,Validators.required],colTypeNameControlEdit:[null,Validators.required]}));
  }

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  task_templateList:any=[];
  searchText;
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
  meter_details_list:any=[];
  parameter_details_list:any=[];
  meter_details_list_edit:any=[];
  parameter_details_list_edit:any=[];

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  
  selectedDataType:any
  dataType = [
  {id: 1, name: 'Char'},
  {id: 2, name: 'Int'},
  {id: 3, name:'Float'},
  {id: 4, name:'Image'},
  {id: 5, name:'URL'},
  {id: 6, name:'Decimal'}

  ];

  selectedColType:any
  colType = [
  {id: 1, name: 'Optional'},
  {id: 2, name: 'Mandatory'},
  ];

  removeParametersRow(index){
    if (index != 0){
      this.MeterControl.removeAt(index);
    }else{
      return false
    }

  }

  removeParametersRowEdit(index){
    if (index != 0){
      this.MeterControlEdit.removeAt(index);
    }else{
      return false
    }

  }

  removeAdditionalParametersRow(index){
    if (index != 0){
      this.ParameterControl.removeAt(index);
    }else{
      return false
    }

  }

  removeAdditionalParametersRowEdit(index){
    if (index != 0){
      this.ParameterControlEdit.removeAt(index);
    }else{
      return false
    }

  }

  onCancelClick(){
   this.applicantDetailsFormSubmitted = false;
   this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

  onCloseClick(){
   this.applicantDetailsFormSubmitted = false;
   this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

 scrollOptions = { 
   autoHide: true, 
   scrollbarMinSize: 67,
   scrollbarMaxSize: 180,
 };

 onAddTaskdata(){
  this.applicantDetailsFormSubmitted = true;
  if(this.applicantDetailsForm.value.meterControl != null){
    for(let meter_details of this.applicantDetailsForm.value.meterControl){
      this.meter_details_list.push(
        {
          data_type:meter_details.dataTypeNameControl.name,
          meter: meter_details.meterDetailNameControl,
          col_type:meter_details.colTypeNameControl.name
        }
      );
    }
  }
  
  if(this.applicantDetailsForm.value.parameterControl != null){
    for(let parameter_details of this.applicantDetailsForm.value.parameterControl){
      this.parameter_details_list.push(
        {
          data_type:parameter_details.dataTypeNameControl.name,
          parameter: parameter_details.parameterNameControl,
          col_type:parameter_details.colTypeNameControl.name
        }
      );
    }
  }
  
  console.log(this.parameter_details_list)
  let data ={
    task_name:this.applicantDetailsForm.value.taskNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    meter_read_json_obj:this.meter_details_list,
    additional_parameter_json:this.parameter_details_list
  }

  if (this.applicantDetailsForm.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('meter-data/task-template',data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('meter-data/'+this.utilityIdString+'/task-template/list').subscribe(data=>{
          this.task_templateList = data;
          console.log('List: ', this.task_templateList);
          this.addedSuccessfullyToast=true;
          $('#add_meter_task').modal('hide');
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }
}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('meter-data/'+this.utilityIdString+'/task-template/list').subscribe(data=>{
    this.task_templateList = data;
  })
}

onEditTaskdata(){
  this.applicantDetailsFormEditSubmitted = true;
  if(this.applicantDetailsFormEdit.value.meterControlEdit != null){
    for(let meter_details_edit of this.applicantDetailsFormEdit.value.meterControlEdit){
      this.meter_details_list_edit.push(
        {
          data_type:meter_details_edit.dataTypeNameControlEdit.name,
          meter: meter_details_edit.meterDetailNameControlEdit,
          col_type:meter_details_edit.colTypeNameControlEdit.name
        }
      );
    }
  }
  
  if(this.applicantDetailsFormEdit.value.parameterControlEdit != null){
    for(let parameter_details_edit of this.applicantDetailsFormEdit.value.parameterControlEdit){
      this.parameter_details_list_edit.push(
        {
          data_type:parameter_details_edit.dataTypeNameControlEdit.name,
          parameter: parameter_details_edit.parameterNameControlEdit,
          col_type:parameter_details_edit.colTypeNameControlEdit.name
  
        }
      );
    }
  }
  let data ={
    task_name:this.applicantDetailsFormEdit.value.taskNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    meter_read_json_obj:this.meter_details_list_edit,
    additional_parameter_json:this.parameter_details_list_edit
  }

  

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('meter-data/task-template/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('meter-data/'+this.utilityIdString+'/task-template/list').subscribe(data=>{
          this.task_templateList = data;
          console.log('List: ', this.task_templateList);
          this.editedSuccessfullyToast=true;
          $('#edit_meter_task').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;

    });
  }
}

  ngOnInit(): void {
  }

}
