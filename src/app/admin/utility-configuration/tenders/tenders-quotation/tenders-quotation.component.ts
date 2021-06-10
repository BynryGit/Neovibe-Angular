import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tenders-quotation',
  templateUrl: './tenders-quotation.component.html',
  styleUrls: ['./tenders-quotation.component.scss']
})
export class TendersQuotationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  dtOptions: DataTables.Settings = {};
 

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

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
  dataSet = [
    {
      tender_name: 'Tender Name 1',
      bill_amount: '1001',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
      
    },
    {
      tender_name: 'Tender Name 2',
      bill_amount: '1002',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
     
    },
    {
      tender_name: 'Tender Name 3',
      bill_amount: '1003',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
    },
    {
      tender_name: 'Tender Name 4',
      bill_amount: '1004',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
    },
    {
      tender_name: 'Tender Name 5',
      bill_amount: '1005',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
    },
    {
      tender_name: 'Tender Name 6',
      bill_amount: '1006',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
    },
    {
      tender_name: 'Tender Name 7',
      bill_amount: '1007',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
    },
    {
      tender_name: 'Tender Name 8',
      bill_amount: '1008',
      submission_date:'1 Nov 2020',
      description: 'Lorem Ipsum',
      active: ['Yes','No'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'1 Nov 2020'
     
    },
    
    
]



  blocks = [
    {
        name:       "Tender Name",
    },
    {
        name:       "Amount",
    },
    {
        name:       "Submission Date",
    },
    {
        name:       "Description",
    },
    {
        name:       "Active",
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

}
