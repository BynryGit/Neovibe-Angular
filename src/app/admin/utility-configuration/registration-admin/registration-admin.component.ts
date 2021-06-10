import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.scss']
})
export class RegistrationAdminComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  
  testing(){
      // $('#registrationtypetab').on('shown.bs.tab', function(e) {
      //   e.target // newly activated tab    
      //   $(this).addClass("active").addClass("finished"); 
      //   $('#registrationtype').show();
      //   $('#registrationsubtype').hide();
      //   $('#consent').hide();
      //   $('#owner').hide();
      //   $('#document').hide();
      //   $('#template').hide();
      // });
      // $('#registrationsubtypetab').on('shown.bs.tab', function(e) {
      //   e.target // newly activated tab
      //   // alert('working2'); 
      //   $('#registrationtypetab').removeClass("active").addClass("finished"); 
      //   $(this).addClass("active");      
      //   $('#registrationtype').hide();
      //   $('#registrationsubtype').show();
      //   $('#consent').hide();
      //   $('#owner').hide();
      //   $('#document').hide();
      //   $('#template').hide(); 
       
  
      // });
      $('#consenttab').on('shown.bs.tab', function(e) {
        e.target // newly activated tab
        // alert('working3');
         
       
        $(this).addClass("active");
        $('#consent').show();
        $('#owner').hide();
        
  
      });
      $('#ownertab').on('shown.bs.tab', function(e) {
        e.target // newly activated tab
        // alert('working4');
        $('#consenttab').removeClass("active").addClass("finished");      
        $(this).addClass("active");
        $('#consent').hide();
        $('#owner').show();
       
      });
      // $('#documenttab').on('shown.bs.tab', function(e) {
      //   e.target // newly activated tab
      //   // alert('working4');
      //   $('#registrationtypetab').removeClass("active").addClass("finished");    
      //   $('#registrationsubtypetab').removeClass("active").addClass("finished"); 
      //   $('#registrationconsenttab').removeClass("active").addClass("finished"); 
      //   $('#ownertab').removeClass("active").addClass("finished");   
      //   $(this).addClass("active");
      //   $('#registrationtype').hide();
      //   $('#registrationsubtype').hide();
      //   $('#consent').hide();
      //   $('#owner').hide();
      //   $('#document').show();
      //   $('#template').hide(); 
       
      // });

      // $('#templatetab').on('shown.bs.tab', function(e) {
      //   e.target // newly activated tab
      //   // alert('working4');
      //   $('#registrationtypetab').removeClass("active").addClass("finished");    
      //   $('#registrationsubtypetab').removeClass("active").addClass("finished"); 
      //   $('#registrationconsenttab').removeClass("active").addClass("finished"); 
      //   $('#ownertab').removeClass("active").addClass("finished"); 
      //   $('#documenttab').removeClass("active").addClass("finished");   
      //   $(this).addClass("active");
      //   $('#registrationtype').hide();
      //   $('#registrationsubtype').hide();
      //   $('#consent').hide();
      //   $('#owner').hide();
      //   $('#document').hide();
      //   $('#template').show(); 
      // });
      
     
  }

}


