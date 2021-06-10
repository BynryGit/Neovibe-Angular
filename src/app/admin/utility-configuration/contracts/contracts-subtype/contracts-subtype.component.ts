import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService} from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contracts-subtype',
  templateUrl: './contracts-subtype.component.html',
  styleUrls: ['./contracts-subtype.component.scss']
})
export class ContractsSubtypeComponent implements OnInit {
  contractSubtype: any= [];
  contractType:any=[];
  dtTrigger: Subject<any> = new Subject();
  utilityIdString = '46630030-6eb2-4818-967f-c0a3067e7258';
  dtOptions: DataTables.Settings = {};
  searchText;


  constructor(private filterService : FilterService,private apiService : ApiService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('contract/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
      this.contractSubtype = data;
    })

    this.apiService.get('contract/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.contractType=cnttype.results; 
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

  addSubTypeData;

  onAddSubTypedata(){
    this.addSubTypeData={
      name:this.contractSubtype.name,
      type_id:this.contractType.id_string.id_string,
      utility_id:"46630030-6eb2-4818-967f-c0a3067e7258",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.post('contract/'+'subtype',this.addSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
        this.contractSubtype = data;
      })
    })
    console.log('result:',this.addSubTypeData);

  }
  
  editSubTypeData;

  onEditTypedata(){
    this.editSubTypeData={
      name:this.contractSubtype.name,
      type_id:this.contractType.id_string.id_string,
      utility_id:"46630030-6eb2-4818-967f-c0a3067e7258",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.put('contract/'+this.id_string+'/subtype',this.editSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/subtype'+'/list').subscribe(data=>{
        this.contractSubtype = data;
      })
    })
    console.log('result:',this.editSubTypeData);

  }

  id_string;

  onCardclickevent(item:any){
    this.id_string=item.id_string
    console.log(this.id_string);
    this.apiService.get('contract/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.contractType=cnttype.results; 
    })  
  }

  onAddclickevent(){
    this.apiService.get('contract/'+this.utilityIdString+'/type'+'/list').subscribe(cnttype=>{
      this.contractType=cnttype.results; 
    }) 

  }


 

}
