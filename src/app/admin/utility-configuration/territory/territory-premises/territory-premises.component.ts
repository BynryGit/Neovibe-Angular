import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
import * as XLSX from 'xlsx'; 
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Subject } from 'rxjs';
import { CsvModule } from '@ctrl/ngx-csv';
// import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';



@Component({
  selector: 'app-territory-premises',
  templateUrl: './territory-premises.component.html',
  styleUrls: ['./territory-premises.component.scss'],
  providers: [ErrorMessage]
})



export class TerritoryPremisesComponent implements OnInit {


  /*name of the excel-file which will be downloaded. */ 
  fileName= 'ExcelSheet.xlsx';  

  

  @ViewChild('tablepdf') tablepdf:ElementRef;
  constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.filterService.getPagination().subscribe(data=>{
      // $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      // $('#table1').DataTable().search(data.text).draw()
    })

    // $('#table1').DataTable().order([ 1, 'asc' ]).draw()
  
    this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
      this.subareaList = data;
    
    })
    this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data => {
      this.premiseList = data;
    }) 
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    })
   
    this.apiService.get('global-lookup/list').subscribe(data => {
      this.meter_typeList = data;
    }) 

     // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    subareaNameControl: [null, [Validators.required]],
    categoryNameControl: [null, [Validators.required]],
    premiseNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
    gisNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    mruNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    meterNameControl:[null, [Validators.required]]
  });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({
    subareaNameControlEdit: [null, [Validators.required]],
    categoryNameControlEdit: [null, [Validators.required]],
    premiseNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
    gisNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    mruNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    meterNameControlEdit:[null, [Validators.required]]
  });
   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  dtOptions: DataTables.Settings = {};
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faPrint = faPrint;
  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faEye = faEye;
  faPlus = faPlus;
  subareaList: any =[];
  premiseList: any =[];
  meter_typeList:any=[];
  consumer_categoryList: any=[];
  consumer_subcategoryList:any=[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd:boolean = false;
  

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('table1'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
  

  public SavePDF(): void {  
  //   let content=this.table1.nativeElement;  
  //   // let doc = new jsPDF();  
  //   const doc: jsPDF = new jsPDF("p", "pt", "a4");
  //   // let _elementHandlers =  
  //   // {  
  //   //   '#editor':function(element,renderer){  
  //   //     return true;  
  //   //   }  
  //   // };  
    
  //   doc.html(content.innerHTML, {
  //     callback: (doc) => {
  //       doc.output("dataurlnewwindow");
  //      
  //     }
  //  });
  //   // doc.fromHTML(content.innerHTML,15,15,{  
  
  //   //   'width':190,  
  //   //   'elementHandlers':_elementHandlers  
  //   // });  
  
  //   doc.save('test.pdf');  
  }  

  public downloadAsPDF() {
    const doc = new jspdf({
      orientation: "landscape",
    });

     let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  

    const pdfTable = this.tablepdf.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 1000,
      'elementHandlers': _elementHandlers,
      cellWidth : 7,
      columnWidth : 500

    });
    

    doc.save('tableToPdf.pdf');
  }

  
  results() : void {
     
      new ngxCsv(this.dataSet, 'My Report');
  }



  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  dataSet = [
    
  ]

  blocks = [
    {
      name:       "Premise",
    },
    {
      name:       "GIS",
    },
    {
      name:       "MRU",
    },
    {
        name:       "County",
    },
    {
        name:       "Zone",
    },
    {
      name:       "Division",
  },
    {
        name:       "Area",
    },
    {
        name:       "Sub Area",
    },
    {
      name:       "Created Date",
  },
    {
        name:       "Action",
    }

    
]

addPremiseData;
dtTrigger: Subject<any> = new Subject<any>();
processing;
editPremiseData;
premiseObj: any = {};
premiseObj1: any = {};
premiseObj2: any = {};
categoryObj:any = {};
meterObj:any = {};
areaList: any =[];
showTable: boolean = true;
onAddPremisedata(){
  this.applicantDetailsFormSubmitted = true;
  let data ={
    name:this.applicantDetailsForm.value.premiseNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    category_id:this.applicantDetailsForm.value.categoryNameControl.id_string,
    meter_id:this.applicantDetailsForm.value.meterNameControl.id_string,
    subarea_id:this.applicantDetailsForm.value.subareaNameControl.id_string,
    GIS:this.applicantDetailsForm.value.gisNameControl,
    MRU:this.applicantDetailsForm.value.mruNameControl
  }
  this.disableAdd = true;

  if (this.applicantDetailsForm.invalid) {
    this.disableAdd = false;
   
    return;
  }else{
    var table = $('#table1').DataTable({});
    
    this.apiService.post('utility/premise',data).subscribe(result=>{
      
      if(result.state == 'success'){
       
        this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#addPremisesModal').modal('hide');
        this.disableAdd = false;
        this.applicantDetailsForm.reset();
        this.applicantDetailsFormSubmitted = false;
        // table.clear();
        // // table.row.add( [ 'Category 1', 'Analog', 'yhu', 'premise','fgv','uij' ] )
        // table.reload();
        // this.ngOnInit();
        // this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data=>{
        //   this.premiseList = data;
        //  
        //   this.addedSuccessfullyToast=true;
        //   $('#addPremisesModal').modal('hide');
        //   this.applicantDetailsForm.reset();
        //   this.applicantDetailsFormSubmitted = false;
        // })
      }
    },(err) => {
      this.exceptionToast=true;
      this.disableAdd = false;
    });
  }
}

onEditPremisedata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    name:this.applicantDetailsFormEdit.value.premiseNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    category_id:this.applicantDetailsFormEdit.value.categoryNameControlEdit.id_string,
    meter_id:this.applicantDetailsFormEdit.value.meterNameControlEdit.id_string,
    subarea_id:this.applicantDetailsFormEdit.value.subareaNameControlEdit.id_string,
    GIS:this.applicantDetailsFormEdit.value.gisNameControlEdit,
    MRU:this.applicantDetailsFormEdit.value.mruNameControlEdit
  }
  this.disableAdd = true;

  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    
    return;
  }else{
    
    this.apiService.put('utility/premise/'+this.id_string,data).subscribe(result=>{
     
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data=>{
          this.premiseList = data;
          
          this.editedSuccessfullyToast=true;
          $('#editPremisesModal').modal('hide');
          this.disableAdd = false;
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.disableAdd = false;
      this.exceptionToast=true;

    });
  }
}

onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
    this.subareaList = data;
   
  })
}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
 
}

ngOnInit(): void {
  
  
  const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing:true,
      
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'csv', 'excel', 'print'
    // ],
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`utility/${that.utilityIdString}/premise/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
            
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
