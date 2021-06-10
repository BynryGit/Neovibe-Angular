import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart360-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationScrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 33,
    scrollbarMaxSize: 99,
  };

  isValid = false;
  notifications = { data:[
    { title : 'Complaint Resolved!',
      status:'New', desc:'Lorem ipsum dolor sit amet, consectetur adipisciel Videmusne ut',
      date:'01 Jan 2020',pay_due : 'Payment Due',isValid:false
    },
    { title : 'Payment Due',
      desc:'Lorem ipsum dolor sit amet, consectetur adipisciel Videmusne ut', 
      day:'Yesterday',isValid:true,link:'consumerops/registration'
    },
    { title : 'Registration',status:'Approve',
      desc:'Lorem ipsum dolor sit amet, consectetur adipisciel Videmusne ut', 
      day:'10 Jan 2020',isValid:false
    }]
  };

  constructor() { }

  ngOnInit(): void {
  
  }

}
