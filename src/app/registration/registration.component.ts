import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private commonServices:CommonService) { }

  ngOnInit(): void {
    
  }

}
