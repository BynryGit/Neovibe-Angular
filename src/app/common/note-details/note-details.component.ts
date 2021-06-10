import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NoteDetailsService } from '../note-details/note-details.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { ApiService } from '../../common-services/api-service/api.service';
declare var $:any

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  @Input() data;

  notes = []
  data_remove:any;
  faPlus = faPlus;
  faPrint = faPrint;
  faTrash = faTrash;
  color : String = "notes-card colr1"
  note : any;
  note_name : any;
  response : any;
  response_edit:any;
  note_card_id : any;
  showAddButton = true;
  

  constructor(private noteService : NoteDetailsService,private apiService : ApiService,private sessionService : SessionService) { }

  ngOnInit(): void {
    this.notes = this.data
    console.log("DATA",this.notes)
  }

  public show:boolean = false;
  public add_Note:boolean = false;
  toggle() {
    this.show = !this.show;
    this.add_Note = !this.add_Note;
  }

  changeColor(e) {
    this.color = e.target.defaultValue;
  }

  onCancelClick(){
    this.show = !this.show;
    this.showAddButton = true;
    this.show_edit = false;

  }

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id;
  console.log(this.id_string);
}

onRemoveClick(item:any){
  this.id_string = item.id;
  console.log("REMOVE CLICK",this.id_string);
  this.apiService.get('user/note/'+this.id_string).subscribe(data => {
    data.results.is_active = false;
    console.log("DATA FOR CARD REMOVE",data)
    console.log("DATA FOR CARD REMOVE AGAIN",data.results)
    this.data_remove = {
      note_name : data.results.note_name,
      note : data.results.note,
      note_color : data.results.note_color,
      is_active : data.results.is_active
    }
    console.log("DATA REMOVE",this.data_remove)
    this.apiService.put('user/note/'+this.id_string+'/utility/'+this.sessionService.getter('utility_id_string_admin'),this.data_remove).subscribe(resp=>{
      console.log('resp: ', resp);
      if(resp.state == 'success'){
        alert("Success");
      }else{
        alert("Failed");
      }
    })
  }) 
}

  onNoteChange(e){
    this.note = e.target.value;
    $("#note-error").hide()
  }

  onNoteNameChange(e){
    this.note_name = e.target.value;
    $("#note-name-error").hide()
  }

  addNote(){
    this.add_Note = true;
    if(this.note == null || this.note == "" || this.note == undefined){
      $("#note-error").show()
    }
    if(this.note_name == null || this.note_name == ""){
      $("#note-name-error").show()
    }
    if((this.note != null || this.note != "" || this.note != undefined) && (this.note_name != null || this.note_name != "" || this.note != undefined)){
      this.response = {
        note_name : this.note_name,
        note : this.note,
        note_color : this.color
      }
      // this.show = !this.show;
      // this.add_Note = !this.add_Note;
      this.noteService.sendNoteResponse(this.response)
      console.log("Reee",this.response)
    }
  }

  saveNote(){
    if(this.note == null || this.note == "" || this.note == undefined){
      $("#note-error").show()
    }
    if(this.note_name == null || this.note_name == ""){
      $("#note-name-error").show()
    }
    if((this.note != null || this.note != "" || this.note != undefined) && (this.note_name != null || this.note_name != "" || this.note != undefined)){
      this.response_edit = {
        note_name : this.note_name,
        note : this.note,
        note_color : this.color,
        note_card_id : this.id_string
      }
      this.noteService.sendNoteEditResponse(this.response_edit)
      console.log("Reee",this.response_edit)
    }
  }
  public show_edit:boolean = false;
  onEditNoteClick(){
    this.showAddButton = false;
    this.add_Note = false;
    this.show_edit = !this.show_edit;
    this.show = !this.show;
    
  }

}
