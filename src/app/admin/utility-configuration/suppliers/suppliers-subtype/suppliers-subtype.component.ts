import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-suppliers-subtype',
  templateUrl: './suppliers-subtype.component.html',
  styleUrls: ['./suppliers-subtype.component.scss']
})
export class SuppliersSubtypeComponent implements OnInit {
  supplierSubType: any= [];
  supplierType:any=[];
  dtTrigger: Subject<any> = new Subject();
  utilityIdString = '3b104aa2-17f2-440f-afea-e49e79e4c0e5';
  dtOptions: DataTables.Settings = {};
  searchText;


  constructor(private filterService : FilterService,private apiService : ApiService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('supplier/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
      this.supplierSubType = data;
    })

    this.apiService.get('supplier/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.supplierType=cnttype.results; 
    })  

   }
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

  selectedsubtype:any
  subtype = [
  {id: 1, name: 'SubType 1'},
  {id: 2, name: 'SubType 2'},
  ];

  selectedtype:any
  type = [
  {id: 1, name: 'Type 1'},
  {id: 2, name: 'Type 2'},
  ];

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };


  ngOnInit(): void {
    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
    }
  }

  addSupplierSubTypeData;

  onAddSupplierSubTypedata(){
    this.addSupplierSubTypeData={
      name:this.supplierSubType.name,
      supplier_type_id:this.supplierType.id_string.id_string,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",     
    }
    this.apiService.post('supplier/'+'subtype',this.addSupplierSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('supplier/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
        this.supplierSubType = data;
      })
    })
    console.log('result:',this.addSupplierSubTypeData);
  }

  editSupplierSubTypeData;

  onEditSupplierSubTypedata(){
    this.editSupplierSubTypeData={
      name:this.supplierSubType.name,
      supplier_type_id:this.supplierType.id_string.id_string,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.put('supplier/'+this.id_string+'/subtype',this.editSupplierSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('supplier/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
        this.supplierSubType = data;
      })
    })
    console.log('result:',this.editSupplierSubTypeData);

  }

  id_string;

  onCardclickevent(item:any){
    this.id_string=item.id_string
    console.log(this.id_string);
    this.apiService.get('supplier/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.supplierType=cnttype.results; 
    })  
  }

  onAddclickevent(){
    this.apiService.get('supplier/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.supplierType=cnttype.results; 
    })  

  }



}
