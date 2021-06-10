import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-survey-objective',
  templateUrl: './survey-objective.component.html',
  styleUrls: ['./survey-objective.component.scss']
})
export class SurveyObjectiveComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('survey/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.survey_typeList = data;
    })
    this.apiService.get('survey/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.survey_subtypeList = data;
    })
    this.apiService.get('survey/utility/'+this.utilityIdString+'/objective/list').subscribe(data=>{
      this.survey_objList = data;
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
  survey_objList:any={};
  survey_Obj: any = {};
  survey_Obj1: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
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

  addObjectiveData;
  editObjectiveData;

  onAddSurveyObjdata(){
    this.addObjectiveData ={
      objective:this.survey_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      survey_type_id:this.survey_Obj.bindvalue.id_string,
      survey_subtype_id:this.survey_Obj1.bindvalue.id_string

      
    }
  
    this.apiService.post('survey/objective',this.addObjectiveData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/objective/list').subscribe(data=>{
        this.survey_objList = data;
      })
  
    })
  }

  onEditSurveyObjdata(){
    this.editObjectiveData={
    objective:this.survey_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    survey_type_id:this.survey_Obj.bindvalue.id_string,
    survey_subtype_id:this.survey_Obj1.bindvalue.id_string
    }
    this.apiService.put('survey/objective/'+this.id_string,this.editObjectiveData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('survey/utility/'+this.utilityIdString+'/objective/list').subscribe(data=>{
        this.survey_objList= data;
      })
    })
    console.log('result:',this.editObjectiveData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('survey/utility/'+this.utilityIdString+'/objective/list').subscribe(data=>{
      this.survey_objList = data;
    }) 
  }

  ngOnInit(): void {
  }

}
