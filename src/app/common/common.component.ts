import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'smart360-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit , OnDestroy{

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
      function myFunction(x) {
        if (x.matches) {
          $('.main-container').css('margin-left', '60px');
        } else {
          $('.main-container').css('margin-left', '70px');
        }
      }
      var x = window.matchMedia("(max-width: 1599px)")
      myFunction(x);
      x.addListener(myFunction);  
    });
  }

  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
