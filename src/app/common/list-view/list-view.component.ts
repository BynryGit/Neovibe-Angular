import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var $;

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  // dataSet = [
  //   [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$150,750", '<button class="foo">Alert</button>' ],
  //   [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
  //   [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
  //   [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ]
  // ]

  dataSet = [
        {
            "name":       "Tiger Nixon",
            "position":   "System Architect",
            "salary":     "$ 3,120",
            "start_date": "2011/04/25",
            "office":     "Edinburgh",
            "extn":       "5421",
            "action":      '<button>Ccool</button>'
        },
        {
            "name":       "Garrett Winters",
            "position":   "Director",
            "salary":     "$ 5300",
            "start_date": "2011/07/25",
            "office":     "Edinburgh",
            "extn":       "8422",
            "action":      '<button (click)="alert()">Ccool</button>'
        },
        
    ]


  dtOptions: DataTables.Settings = {};

  constructor() {
  	
  }

  ngOnInit(): void {

    $('#table1').DataTable( {
      pagingType: 'full_numbers',
      paging: true,
      ordering: true,
      data: this.dataSet,
      columns: [
        { "title": "Name", "data": "name", },
        { "title": "Position", "data": "position" },
        { "title": "Office", "data": "office" },
        { "title": "Extn", "data": "extn" },
        { "title": "Start date", "data": "start_date" },
        { "title": "Salary", "data": "salary" },
        { "title": "Action", "data": "action", "className": "foo"}
      ],
      lengthMenu: [ 10, 12, 25, 50, 75, 100 ],
      pageLength: 12,
    });

    var table = $('#table1').DataTable();

    
    $('#table1').on('mouseenter', '.foo', 'tbody tr', function (e) {
        console.log($('#table1').DataTable().rows(0)[0].values)
    } );
    
  }

  testing(){
    alert('Rohan wagh!!!!!!')
  }


}
