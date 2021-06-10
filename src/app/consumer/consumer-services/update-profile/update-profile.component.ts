import { Component, OnInit, Input } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../../error-messages/error-messages';
import { ApiService } from '../../../common-services/api-service/api.service';
declare var $: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

    @Input() trigger
    @Input() consumerId
    consumerIdString : String
    utilityIdString : String
    emailForm : FormGroup;
    typeForm : FormGroup;
    addressForm : FormGroup;
    mobileForm : FormGroup;
    consumer:any = null
    message = new ErrorMessage()
    typeFormSubmitted = false;
    stateProvinces : any[] = [];
    cities : any[] = [];
    areas : any[] = [];
    premieses : any[] =[];
    subAreas : any[] = [];
    showtoast: boolean;
    types = [
    	{
    		id : 1,
            name : "Email"
    	},
        {
            id : 2,
            name : "Address"
        },
        {
            id : 3,
            name : "Mobile"
        }
    ]
    scrollOptions = { 
	    autoHide: true, 
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };

    constructor(private router : Router, private apiService : ApiService, private formBuilder: FormBuilder) {

        // Update type form code start
            this.typeForm = this.formBuilder.group({
                type : [{id : 1, name : "Email"}, [Validators.required]],
                remark : [null, [Validators.required]]
            })
        // Update type form code end

	    // Update email form code start
	    	this.emailForm = this.formBuilder.group({
	    		email : [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
	    	})
	    // Update email form code end

        // Update address form code start
            this.addressForm = this.formBuilder.group({
                address : [null, [Validators.required]],
                street : [null, [Validators.required]],
                state : [null, [Validators.required]],
                city : [null, [Validators.required]],
                area : [null, [Validators.required]],
                subArea : [null, [Validators.required]],
                premiese : [null, [Validators.required]],
                zipCode : [null, [Validators.required]],
            })
        // Update address form code end

        // Update mobile form code start
            this.mobileForm = this.formBuilder.group({
                mobile : [null, [Validators.required]],
            })
        // Update mobile form code end
    }

    ngOnInit(): void {
  		this.trigger
        this.consumerIdString = this.consumerId
        this.showtoast = false;
        // Api call for consumer start
        this.apiService.get("consumer/"+this.consumerIdString).subscribe(data=>{
            this.consumer = data['result']
            this.utilityIdString = this.consumer.utility_id_string

            // State/Provience dropdown api call start
            this.apiService.get('utility/'+this.utilityIdString+'/state/list').subscribe(data=>{
              for(let item of data['results']){
                this.stateProvinces.push({
                  name : item.name,
                  id_string : item.id_string,
                })
              }
            },error=>{alert(error)})
            // State/Provience dropdown api call end

            // Cities dropdown api call start
            this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
              for(let item of data['results']){
                this.cities.push({
                    name : item.name,
                    id_string : item.id_string
                })
              }
            },error=>{alert(error)})
            // Cities dropdown api call end

            // Areas dropdown api call start
            this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data=>{
              for(let item of data['results']){
                this.areas.push({
                    name : item.name,
                    id_string : item.id_string
                })
              }
            },error=>{alert(error)})
            // Areas dropdown api call end

            // Sub Areas dropdown api call start
            this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
              for(let item of data['results']){
                this.subAreas.push({
                    name : item.name,
                    id_string : item.id_string
                })
              }
            },error=>{alert(error)})
            // Sub Areas dropdown api call end

            // Premise dropdown api call start
            this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data=>{
              for(let item of data['results']){
                this.premieses.push({
                    name : item.name,
                    id_string : item.id_string
                })
              }
            },error=>{alert(error)})
            // Premise dropdown api call end

        },error=>{alert(error)})
        // Api call for consumer end

    }

    // email details form control start
    get ed() { return this.emailForm.controls; }
    // email details form control end

    // type details form control start
    get td() { return this.typeForm.controls; }
    // type details form control end

    // address details form control start
    get ad() { return this.addressForm.controls; }
    // address details form control end

    // mobile details form control start
    get md() { return this.mobileForm.controls; }
    // mobile details form control end

    // Update profile form reset start
    formReset(){
        this.typeFormSubmitted = false
        this.emailForm.reset();
        this.addressForm.reset();
        this.mobileForm.reset();
    }
    // Update profile form reset end

    // Set email change data start
    setEmailData(){
        let data = {
            email : this.emailForm.value.email,
            password : this.consumer.password,            
            remark : this.typeForm.value.remark
        }
        this.callProfileChangeApi(data)
    }
    // Set email change data end

    // Set address change data start
    setAddressData(){
        let data = {
            billing_address_line_1 : this.addressForm.value.address,
            billing_street : this.addressForm.value.street,
            billing_zipcode : this.addressForm.value.zipCode,
            billing_state_id : this.addressForm.value.state.id_string,
            billing_city_id : this.addressForm.value.city.id_string,
            billing_area_id : this.addressForm.value.area.id_string,
            billing_sub_area_id : this.addressForm.value.subArea.id_string,
            premise_id : this.addressForm.value.premiese.id_string,
            remark : this.typeForm.value.remark,
            password : this.consumer.password,  
            email : this.consumer.email,  
        }
        this.callProfileChangeApi(data)
    }
    // Set address change data end

    // Set mobile change data start
    setMobileData(){
        let data = {
            phone_mobile : this.mobileForm.value.mobile,
            mobile_change : true,
            remark : this.typeForm.value.remark,
            password : this.consumer.password,  
            email : this.consumer.email,
        }
        this.callProfileChangeApi(data)
    }
    // Set mobile change data end

    // Api call for profile change start
    callProfileChangeApi(data){
        this.apiService.put('consumer/'+this.consumerIdString, data).subscribe(data=>{
            if(data.state == "success"){
                
                $('#profileChangeModal').modal('hide');
                this.typeFormSubmitted = false
                this.emailForm.reset()
                this.addressForm.reset()
                this.mobileForm.reset()
                this.typeForm.controls.remark.reset()
                // window.location.reload();
                this.showtoast =true;
                this.apiService.get("consumer/"+this.consumerId).subscribe(data=>{
                this.consumer = data['result']
                });
            }
        })
    }
    // Api call for profile change end

    // type form submit start
    onTypeFormSubmit(){
        this.typeFormSubmitted = true
        if (this.typeForm.invalid) {
            return;
        }else{
            console.log('=====',this.typeForm.value.type.id)
            if(this.typeForm.value.type.id == 1){
                if (this.emailForm.invalid) {
                    return;
                }else{
                    this.setEmailData()
                }
            }
            if(this.typeForm.value.type.id == 2){
                if (this.addressForm.invalid) {
                    return;
                }else{
                    this.setAddressData()
                }
            }
            if(this.typeForm.value.type.id == 3){
                if (this.mobileForm.invalid) {
                    return;
                }else{
                    this.setMobileData()
                }
            }
        }
    }
    // type form submit end

}
