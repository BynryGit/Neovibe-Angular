import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asset-contract',
  templateUrl: './asset-contract.component.html',
  styleUrls: ['./asset-contract.component.scss']
})
export class AssetContractComponent implements OnInit {

  constructor() { }
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
  
  
  

 
 

  dataSet = [
    {
      contract_name:'Contract Name 1',
      provider:'Provider 1',
      services:'Service 1',
      frequency:'Frequency 1',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
      
    },
    {
      contract_name:'Contract Name 2',
      provider:'Provider 2',
      services:'Service 2',
      frequency:'Frequency 2',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
     
    },
    {
      contract_name:'Contract Name 3',
      provider:'Provider 3',
      services:'Service 3',
      frequency:'Frequency 3',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
    },
    {
      contract_name:'Contract Name 4',
      provider:'Provider 4',
      services:'Service 4',
      frequency:'Frequency 4',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
    },
    {
      contract_name:'Contract Name 5',
      provider:'Provider 5',
      services:'Service 5',
      frequency:'Frequency 5',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
    },
    {
      contract_name:'Contract Name 6',
      provider:'Provider 6',
      services:'Service 6',
      frequency:'Frequency 6',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
    },
    {
      contract_name:'Contract Name 7',
      provider:'Provider 7',
      services:'Service 7',
      frequency:'Frequency 7',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
    },
    {
      contract_name:'Contract Name 8',
      provider:'Provider 8',
      services:'Service 8',
      frequency:'Frequency 8',
      cost: 500,
      start_date: '30 Oct 2020',
      end_date: '30 Oct 2020',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date: '30 Oct 2020',
     
    },
    
    
]



  blocks = [
    {
      name:       "Crontact Name",
    },
    {
        name:       "Provider",
    },
    {
        name:       "Cost",
    },
    {
        name:       "Services",
    },
    {
        name:       "Frequency",
    },
    {
        name:       "Start Date",
    },
    {
        name:       "End Date",
    },
    {
        name:       "Active",
    },
    {
      name:       "Created by",
    },
    {
      name:       "Created Date",
    },
    {
      name:       "Action",
    },

    
]

  ngOnInit(): void {
  }

}
