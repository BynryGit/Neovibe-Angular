import { Component, OnInit } from '@angular/core';
import { faChevronDown, faSearch, faMapMarkerAlt, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'smart360-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  faSearch = faSearch;
  faChevronDown = faChevronDown;
  faMapMarkerAlt = faMapMarkerAlt;
  faBell = faBell;
  faPlus = faPlus;

  addMenus = { data: [
    {id:1, module : 'Registration',link:'#'},
    {id:2, module : 'Survey',link:'#'},
    {id:3, module : 'Campaign',link:'#'}] 
  };

  constructor() { }

  ngOnInit(): void {
  }

}
