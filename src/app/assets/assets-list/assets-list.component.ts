import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {


  ngOnInit(): void {
  }


  dtOptions: DataTables.Settings = {};
  model: NgbDateStruct;
  date: {year: number, month: number}; 
  collection = { count: 60, data: [] };

  constructor(private router: Router) {
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          assetId: "0019924" + (i + 1),
          assetName:"Name" + (i + 1),
          category:"category"+(i + 1),
          sub_category:"sub_category"+(i+1),
          status: ['danger', 'success', 'warning'].sort((a, b) => .5 - Math.random())[0],
          area: "Pune",
          installationDate: new Date(),
          make: "Idgf_" + i,
          model: "M689457" + i,
          vendor:"Vendor 1"
        }
      );
    }
   }

}
