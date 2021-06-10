import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private filterService : FilterService,private apiService : ApiService,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
    
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
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;
  stateList:any=[];
  countryList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  stateObj: any = {};
  bindvalue:string;
  searchText;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  dataSet = [
    {
      name: ['Document 1','Document 2'].sort((a, b) => .5 - Math.random())[0],
      doc_type: ['Type 1', 'Type 2'].sort((a, b) => .5 - Math.random())[0],
      doc_subtype: ['Subtype 1', 'Subtype 2'].sort((a, b) => .5 - Math.random())[0],
      doc_module: ['Module 1','Module 2'].sort((a, b) => .5 - Math.random())[0],
      doc_submodule: ['Submodule 1','Submodule 2'].sort((a, b) => .5 - Math.random())[0],
      doc_file: ['File 1','File 2'].sort((a, b) => .5 - Math.random())[0]
      
    },
    {
      name: ['Document 1','Document 2'].sort((a, b) => .5 - Math.random())[0],
      doc_type: ['Type 1', 'Type 2'].sort((a, b) => .5 - Math.random())[0],
      doc_subtype: ['Subtype 1', 'Subtype 2'].sort((a, b) => .5 - Math.random())[0],
      doc_module: ['Module 1','Module 2'].sort((a, b) => .5 - Math.random())[0],
      doc_submodule: ['Submodule 1','Submodule 2'].sort((a, b) => .5 - Math.random())[0],
      doc_file: ['File 1','File 2'].sort((a, b) => .5 - Math.random())[0]
      
    },
    {
      name: ['Document 1','Document 2'].sort((a, b) => .5 - Math.random())[0],
      doc_type: ['Type 1', 'Type 2'].sort((a, b) => .5 - Math.random())[0],
      doc_subtype: ['Subtype 1', 'Subtype 2'].sort((a, b) => .5 - Math.random())[0],
      doc_module: ['Module 1','Module 2'].sort((a, b) => .5 - Math.random())[0],
      doc_submodule: ['Submodule 1','Submodule 2'].sort((a, b) => .5 - Math.random())[0],
      doc_file: ['File 1','File 2'].sort((a, b) => .5 - Math.random())[0]
      
    },
    {
      name: ['Document 1','Document 2'].sort((a, b) => .5 - Math.random())[0],
      doc_type: ['Type 1', 'Type 2'].sort((a, b) => .5 - Math.random())[0],
      doc_subtype: ['Subtype 1', 'Subtype 2'].sort((a, b) => .5 - Math.random())[0],
      doc_module: ['Module 1','Module 2'].sort((a, b) => .5 - Math.random())[0],
      doc_submodule: ['Submodule 1','Submodule 2'].sort((a, b) => .5 - Math.random())[0],
      doc_file: ['File 1','File 2'].sort((a, b) => .5 - Math.random())[0]
      
    },
    {
      name: ['Document 1','Document 2'].sort((a, b) => .5 - Math.random())[0],
      doc_type: ['Type 1', 'Type 2'].sort((a, b) => .5 - Math.random())[0],
      doc_subtype: ['Subtype 1', 'Subtype 2'].sort((a, b) => .5 - Math.random())[0],
      doc_module: ['Module 1','Module 2'].sort((a, b) => .5 - Math.random())[0],
      doc_submodule: ['Submodule 1','Submodule 2'].sort((a, b) => .5 - Math.random())[0],
      doc_file: ['File 1','File 2'].sort((a, b) => .5 - Math.random())[0]
      
    },
]

blocks = [
  {
      name:       "Name",
  },
  {
    name:       "Type",
  },
 {
  name:       "Subtype",
 },
{
    name:       "Module",
},
{
    name:       "Sub Module",
},
{
  name:       "File Type",
},
{
      name:       "Action",
},  
]


  ngOnInit(): void {
  }

}
