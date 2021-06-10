import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-survey-subtype',
  templateUrl: './survey-subtype.component.html',
  styleUrls: ['./survey-subtype.component.scss']
})
export class SurveySubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.survey_typeList = data;
    })
    this.apiService.get('survey/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.survey_subtypeList = data;
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
  survey_typeList:any={};
  survey_subtypeList:any={};
  survey_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  survey_subtype;
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

  addSurveySubTypeData;
  editSurveySubTypeData;

  onAddSurveySubTypedata(){
    this.addSurveySubTypeData ={
      name:this.survey_subtype_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      survey_type_id:this.survey_subtype_Obj.bindvalue.id_string

      
    }
  
    this.apiService.post('survey/subtype',this.addSurveySubTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
        this.survey_subtypeList = data;
      })
  
    })
  }

  onEditSurveySubTypedata(){
    this.editSurveySubTypeData={
    name:this.survey_subtype_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    survey_type_id:this.survey_subtype_Obj.bindvalue.id_string
    }
    this.apiService.put('survey/subtype/'+this.id_string,this.editSurveySubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
        this.survey_subtypeList = data;
      })
    })
    console.log('result:',this.editSurveySubTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('survey/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.survey_subtypeList = data;
    }) 
  }
  

  ngOnInit(): void {
  }

}
