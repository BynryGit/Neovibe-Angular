import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contracts-terms',
  templateUrl: './contracts-terms.component.html',
  styleUrls: ['./contracts-terms.component.scss']
})
export class ContractsTermsComponent implements OnInit {
  contractTerms: any= [];
  contract:any=[];
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

    this.apiService.get('contract/'+this.utilityIdString+'/terms-and-condition'+'/list').subscribe(data=>{
      this.contractTerms = data;
    })

    this.apiService.get('contract/'+this.utilityIdString+'/list').subscribe(cnttype=>{
      this.contract=cnttype.results; 
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

  addTermsData;

  onAddContractdata(){
    this.addTermsData={
      terms_name:this.contractTerms.terms_name,
      terms:this.contractTerms.terms,
      // contract:this.contract.id_string.id_string,
      remark:this.contractTerms.remark,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.post('contract/'+'terms-and-condition',this.addTermsData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/terms-and-condition'+'/list').subscribe(data=>{
        this.contractTerms = data;
      })
    })
    
    console.log('result:',this.addTermsData);

  }

  editTermsData;

  onEditContractdata(){
    this.editTermsData={
      terms_name:this.contractTerms.terms_name,
      terms:this.contractTerms.terms,
      // contract:this.contract.id_string.id_string,
      remark:this.contractTerms.remark,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",      
    }
    this.apiService.put('contract/'+this.id_string+'/terms-and-condition',this.editTermsData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('contract/'+this.utilityIdString+'/terms-and-condition'+'/list').subscribe(data=>{
        this.contractTerms = data;
      })
    })
    
    console.log('result:',this.editTermsData);

  }

  id_string;

  onCardclickevent(item:any){
    this.id_string=item.id_string
    console.log(this.id_string);
  }

}
