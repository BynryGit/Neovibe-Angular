import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
@Component({
  selector: 'app-survey-type',
  templateUrl: './survey-type.component.html',
  styleUrls: ['./survey-type.component.scss']
})
export class SurveyTypeComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.survey_typeList = data;
    })
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
  survey_type_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  survey_type;
  survey_typeList:any={};
  searchText;

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

  addSurveyTypeData;
  editSurveyTypeData;

  onAddSurveyTypedata(){
    this.addSurveyTypeData ={
      name:this.survey_type_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      
    }
  
    this.apiService.post('survey/type',this.addSurveyTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
        this.survey_typeList = data;
      })
  
    })
  }

  onEditSurveyTypedata(){
    this.editSurveyTypeData={
    name:this.survey_type_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    }
    this.apiService.put('survey/type/'+this.id_string,this.editSurveyTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
        this.survey_typeList = data;
      })
    })
    console.log('result:',this.editSurveyTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.survey_typeList = data;
    }) 
  }
  

  ngOnInit(): void {
  }

}
