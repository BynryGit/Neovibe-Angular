import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contracts-period',
  templateUrl: './contracts-period.component.html',
  styleUrls: ['./contracts-period.component.scss']
})
export class ContractsPeriodComponent implements OnInit {
  contractPeriod: any= [];
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

    this.apiService.get('contract/'+this.utilityIdString+'/period'+'/list').subscribe(data=>{
      this.contractPeriod = data;
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

  addPeriodData;

  onAddPerioddata(){
    this.addPeriodData={
      period:this.contractPeriod.period,
      utility_id:"46630030-6eb2-4818-967f-c0a3067e7258",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.post('contract/'+'period',this.addPeriodData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/period'+'/list').subscribe(data=>{
        this.contractPeriod = data;
      })
    })
    console.log('result:',this.addPeriodData);

  }

  editPeriodData;

  onEditPerioddata(){
    this.editPeriodData={
      period:this.contractPeriod.period,
      utility_id:"46630030-6eb2-4818-967f-c0a3067e7258",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.put('contract/'+this.id_string+'/period',this.editPeriodData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/period'+'/list').subscribe(data=>{
        this.contractPeriod = data;
      })
    })
    console.log('result:',this.editPeriodData);

  }

  id_string;

  onCardclickevent(item:any){
    this.id_string=item.id_string
    console.log(this.id_string);
  }

}
