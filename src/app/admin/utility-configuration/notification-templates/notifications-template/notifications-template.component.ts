import { Component, OnInit } from '@angular/core';
import 'tinymce/icons/default';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $: any;
declare var tinymce: any;


@Component({
  selector: 'app-notifications-template',
  templateUrl: './notifications-template.component.html',
  styleUrls: ['./notifications-template.component.scss'],
  providers:[ErrorMessage]
})
export class NotificationsTemplateComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 
    this.apiService.get('module/list').subscribe(data => {
      this.moduleList = data;
    }) 

    // this.apiService.get('submodule/list').subscribe(data => {
    //   this.submoduleList = data;
    // }) 

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      // moduleNameControl: [null, [Validators.required]],
      // subModuleNameControl: [null, [Validators.required]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      // moduleNameControlEdit: [null, [Validators.required]],
      // subModuleNameControlEdit: [null, [Validators.required]]
    });
    
  }
  searchText;
  moduleList:any=[];
  submoduleList:any=[];
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  moduleChange(){
    let module_id_string = this.applicantDetailsForm.value.moduleNameControl.id_string
    console.log(module_id_string)
    // Submodule dropdown api call start
    this.apiService.get('submodule/list?module_id='+module_id_string).subscribe(data=>{
      this.submoduleList = data;
    })
    // Submodule dropdown api call end
  }
  

  // Object for error messages start
   message = new ErrorMessage() 
   // Object for error messages start
 
   // Applicant details form control start
   get ad() { return this.applicantDetailsForm.controls; }
   // Applicant details form control end
 
   // Applicant details form control start
   get ade() { return this.applicantDetailsFormEdit.controls; }
   // Applicant details form control end

 


  onSaveClick(){
  this.applicantDetailsFormSubmitted = true;
  var text = tinymce.get("mymce3").getContent();
  console.log(text)
  let data ={
    template:text,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    notification_type:"3"
  }

  if (this.applicantDetailsForm.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/notification-template',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
          this.addedSuccessfullyToast=true;
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }
  }

  ngOnInit(): void {
    tinymce.init(
      {
          selector: "#mymce3",
          height : "480",
          menubar:true,
          editor_selector : "mceEditor",
          toolbar: "mybutton | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | demo",
          // setup: function(editor) {
          //   editor.ui.registry.addMenuButton('mergefields', {
          //     text: 'Merge Fields',
          //     fetch: function(callback) {
          //       var items = [];
          //       for (var fieldName in mergeFields) {
          //         var menuItem = {
          //           type: 'menuitem',
          //           text: mergeFields[fieldName],
          //           value:fieldName,
          //           onSetup: function(buttonApi) {
          //             var $this = this;
          //             this.onAction = function() {
          //               editor.insertContent($this.data.value);
          //             };
          //           },
          //         };
          //         items.push(menuItem);
          //       }
          //       callback(items);
          //     },
          //   });
          // }
          setup: function (editor) {
            /* Menu items are recreated when the menu is closed and opened, so we need
               a variable to store the toggle menu item state. */
            var toggleState = false;
        
            /* example, adding a toolbar menu button */
            editor.ui.registry.addMenuButton('mybutton', {
              text: 'Personalize',
              fetch: function (callback) {
                var items = [
                  {
                    type: 'nestedmenuitem',
                    text: 'SUBSCRIBER',
                    getSubmenuItems: function () {
                      return [
                        {
                          type: 'menuitem',
                          text: 'First Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.first_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Last Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.last_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Full Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.full_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Email',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.email}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Email (Primary)',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.email_primary}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Email (Secondary)',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Subscriber.email_secondary}</em>');
                          }
                        }
                      ];
                    }
                  },
                  {
                    type: 'nestedmenuitem',
                    text: 'COMPANY',
                    getSubmenuItems: function () {
                      return [
                        {
                          type: 'menuitem',
                          text: 'Company Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Email',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_email}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Address',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_address}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'City',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_city}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'State',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_state}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Zip Code',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Company.company_zip_code}</em>');
                          }
                        }
                      ];
                    }
                  },
                  {
                    type: 'nestedmenuitem',
                    text: 'DEAL',
                    getSubmenuItems: function () {
                      return [
                        {
                          type: 'menuitem',
                          text: 'Deal Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Deal Amount',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Deal Owner Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Deal Owner Email',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_name}</em>');
                          }
                        }
                      ];
                    }
                  },
                  {
                    type: 'nestedmenuitem',
                    text: 'TICKET',
                    getSubmenuItems: function () {
                      return [
                        {
                          type: 'menuitem',
                          text: 'Requester Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Requester First Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_first_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Requester Last Name',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_last_name}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Requester Email',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.requester_email}</em>');
                          }
                        },
                        {
                          type: 'menuitem',
                          text: 'Ticket ID',
                          onAction: function () {
                            editor.insertContent('&nbsp;<em>{Ticket.ticketID}</em>');
                          }
                        }
                      ];
                    }
                  },
                ];
                callback(items);
              }
            });
        
          }
      });
  }
  }
