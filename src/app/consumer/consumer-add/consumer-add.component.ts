import { Component, OnInit } from '@angular/core';
import { StepperFormService } from '../../common/stepper-form/stepper-form.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '../../error-messages/error-messages';
import { ApiService } from '../../common-services/api-service/api.service';
declare var $ : any;

@Component({
  selector: 'app-consumer-add',
  templateUrl: './consumer-add.component.html',
  styleUrls: ['./consumer-add.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumerAddComponent implements OnInit {

	// constructor start
	constructor(private stepperFormService : StepperFormService, private formBuilder: FormBuilder, private apiService : ApiService) {

		// Applicant details form code start
    	this.applicantDetailsForm = this.formBuilder.group({
    		mobileNoControl: ['', [Validators.required]],
    		masterAccountNoControl: [''],
            emailControl: ['', [Validators.required]],
            ownershipControl: [null, [Validators.required]],
            accountTypeControl: [null, [Validators.required]],
      		vipControl: [null, [Validators.required]],
    		accountHoldersControl: this.formBuilder.array(
	        	[this.formBuilder.group({first_name:[null, [Validators.required]], middle_name:[null], last_name:[null, [Validators.required]], type:[null, [Validators.required]]})]
	        ),
    	});
    	// Applicant details form code end

    	// Address details form code start
		this.addressDetailsForm = this.formBuilder.group({
		  billingAddressLineControl: ['', [Validators.required]],
		  billingStreetControl: ['', [Validators.required]],
		  billingStateProvinceRegionControl: [null, [Validators.required]],
		  billingCityControl: [null, [Validators.required]],
		  billingZipCodeControl: [null, [Validators.required]],
		  billingAreaControl: [null, [Validators.required]],
		  billingSubAreaControl: [null, [Validators.required]],
		});
		// Address details form code end

		// KYC details form code start
	    this.kycDetailsForm = this.formBuilder.group({
	        documentsControl: this.formBuilder.array(
	        	[this.formBuilder.group({document_type_id:[null, [Validators.required]], document_sub_type_id:[null, [Validators.required]], file:[null, [Validators.required]]})]
	        ),
	    });
    	// KYC details form code end

    	// Service details form code start
    	this.serviceDetailsForm = this.formBuilder.group({
            serviceContractsControl: this.formBuilder.array(
            	[this.formBuilder.group({
            		service:[null, [Validators.required]], 
            		category:[null, [Validators.required]], 
            		subCategory:[null, [Validators.required]], 
            		serviceContract:[null, [Validators.required]], 
            		premise:[null, [Validators.required]], 
            		meter:[null, [Validators.required]]
            	})]
        	)
    	});
    	// Service details form code end

    	// Others details form code start
    	this.othersDetailsForm = this.formBuilder.group({
    		otherItemsControl: this.formBuilder.array(
    			[this.formBuilder.group({
    				otherDropdownControl: [this.others,[Validators.required]],
    				creditRatingControl: [null],
    				offerControl: [null],
    				upfPaymentControl : [null]
    			})]
    		)
    	})
    	// Others details form code end

    	// Payment details form code start
	    this.paymentDetailsForm = this.formBuilder.group({
	    	transactionsControl: this.formBuilder.array(
	        	[]
	        ),
	        paymentTypeControl: [null,[Validators.required]],
            paymentSubTypeControl: [null,[Validators.required]],
	        paymentModeControl: [null,[Validators.required]],
	        paymentChannelControl: [null,[Validators.required]],
	        transactionIdControl: [null],
	        paymentAmountControl: [null,[Validators.required]],
	        chequeDdControl: [null],
	        transationDateControl: [null,[Validators.required]],
	    });
    	// Payment details form code end

    	// Consumer ownerships dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/ownership/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.ownerships.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Consumer ownerships dropdown api call end

	    // State/Provience dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/state/list').subscribe(data=>{
	    
	      for(let item of data['results']){
	        this.stateProvinces.push({
	          name : item.name,
	          id_string : item.id_string,
	        })
	      }
	    })
	    // State/Provience dropdown api call end

	    // Cities dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.cities.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Cities dropdown api call end

	    // Areas dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.areas.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Areas dropdown api call end

	    // Sub Areas dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.subAreas.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Sub Areas dropdown api call end

	    // Credit rating dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/credit-rating/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.creditRatings.push({
	        	name : item.rating,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Credit rating dropdown api call end

	    // Consumer offers dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/offer/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.offers.push({
	        	name : item.offer_name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Consumer offers dropdown api call end

	    // Document types dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/document-type/list').subscribe(data=>{
	      for(let item of data){
	        this.documentTypes.push(item)
	      }
	    },error=>{
	    	console.log(error.error)
	    })
	    // Document types dropdown api call end

	    // Document types dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/document-sub-type/list').subscribe(data=>{
	      for(let item of data){
	        this.documentSubTypes.push(item)
	      }
	    },error=>{
	    	console.log(error.error)
	    })
	    // Document types dropdown api call end

	    // Utility services dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/service/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.services.push({
	        	name : item.service.service_name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Utility services dropdown api call end

	    // Utility premise dropdown api call start
	    // this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data=>{
	    //   for(let item of data['results']){
	    //     this.premises.push({
	    //     	name : item.name,
	    //     	id_string : item.id_string
	    //     })
	    //   }
	    // })
	    // Utility premise dropdown api call end

	    // Utility payment type dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{

	      for(let item of data['results']){
	        this.paymentTypes.push({
	        	name : item.name,
	        	id_string : item.id_string,
	        	key : item.payment_type.key
	        })
	      }
	    },error=>{
	    	console.log(error.error)
	    })
	    // Utility payment type dropdown api call end

	    // Utility payment sub type dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
	      
	      for(let item of data['results']){
	        this.paymentSubTypes.push({
	        	name : item.name,
	        	id_string : item.id_string,
	        	key : item.key,
	        	tax : item.tax
	        })
	      }
	    },error=>{
	    	console.log(error.error)
	    })
	    // Utility payment sub type dropdown api call end

	    // Utility payment modes dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.paymentModes.push({
	        	name : item.name,
	        	id_string : item.id_string,
	        	key : item.key
	        })
	      }
	    })
	    // Utility payment modes dropdown api call end

	    // Utility payment channel dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
	      for(let item of data['results']){
	        this.paymentChannels.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Utility payment channel dropdown api call end

	}
	// constructor end

	// Init start
	ngOnInit(): void {
		this.sendStepperFormData()

		// Account type value Changes code start
    	this.applicantDetailsForm.get("accountTypeControl").valueChanges.subscribe(val=>{
    		if(val.id == 1){
    			this.masterAccounNo = false
    		}else{
    			this.masterAccounNo = true
    		}
    	});
    	// Account type value Changes code end
	}
	// Init end

	// Object for error messages start
    message = new ErrorMessage() 
    // Object for error messages start

    utilityIdString = '788a55b4-e183-4144-95fc-5e075138d9a6'
    isAddressSame = false;
    address = ""
	faCalendarAlt = faCalendarAlt;
    faTrash = faTrash;
    masterAccounNo = true;
    chequeDemandDraft = true;
	ownerships : any[] = [];
	stateProvinces : any[] = [];
    cities : any[] = [];
    areas : any[] = [];
    subAreas : any[] = [];
    document : any[] = [];
    documentTypes : any[] = [];
    documentSubTypes : any[] = [];
    consumerCategories : any[] = [];
    consumerSubCategories : any[] = [];
    services : any[] = [];
    meters : any[] = [];
    serviceContracts : any[] = [];
    premises : any[] = [];
    creditRatings : any[] = [];
    offers : any[] = [];
    paymentModes : any[] = [];
    paymentTypes : any[] = [];
    paymentSubTypes : any[] = [];
    paymentChannels : any[] = [];
    others : any[] = [{name : 'Credit rating', key : 'CREDIT'},
    {name : 'offer', key : 'OFFER'},{name : 'Upfront payment', key : 'UPFPAYMENT'}];
    accountHolderTypes =  [
	    {id: 0, name: 'Primary'},
	    {id: 1, name: 'Secondary'},
	    {id: 2, name: 'Tertiary'},
    ];
    vip =  [
	    {id: 'True', name: 'Yes'},
	    {id: 'False', name: 'No'},
	];
	accountTypes =  [
	    {id: 0, name: 'Master'},
	    {id: 1, name: 'Child'},
	    {id: 2, name: 'Test'},
	];

	// Forms build start
    applicantDetailsForm: FormGroup;
    applicantDetailsFormSubmitted = false;
    addressDetailsForm: FormGroup;
    addressDetailsFormSubmitted = false;
    kycDetailsForm: FormGroup;
    kycDetailsFormSubmitted = false;
    serviceDetailsForm: FormGroup;
    serviceDetailsFormSubmitted = false;
    othersDetailsForm: FormGroup
    othersDetailsFormSubmitted = false;
    paymentDetailsForm: FormGroup;
    paymentsDetailsFormSubmitted = false;
    // Forms build end

	// Stepper data start
	blocks = [
	    {
	        name : 'Applicant details',
	        id : 'applicant-dtls-tab',
	        href : '#applicant-dtls',
	        class : 'nav-link active',
	        areaControl : 'applicant-dtls',
	        listClass : 'nav-item list-group-item active'
	    },
	    {
	        name : 'Address details',
	        id : 'applicant-addr-tab',
	        href : '#applicant-addr',
	        class : 'nav-link',
	        areaControl : 'applicant-addr',
	        listClass : 'nav-item list-group-item'
	    },
	    {
	        name : 'KYC documents',
	        id : 'kyc-doc-tab',
	        href : '#kyc-doc',
	        class : 'nav-link',
	        areaControl : 'kyc-doc',
	        listClass : 'nav-item list-group-item'
	    },
	    {
	        name : 'Services',
	        id : 'services-tab',
	        href : '#services',
	        class : 'nav-link',
	        areaControl : 'services',
	        listClass : 'nav-item list-group-item'
	    },
	    {
	        name : 'Others',
	        id : 'others-tab',
	        href : '#others',
	        class : 'nav-link',
	        areaControl : 'others',
	        listClass : 'nav-item list-group-item'
	    },
	    {
	        name : 'Payments',
	        id : 'payments-tab',
	        href : '#payments',
	        class : 'nav-link',
	        areaControl : 'payments',
	        listClass : 'nav-item list-group-item'
	    },
	    {
	        name : 'Review & Submit',
	        id : 'rvw-sbmt-tab',
	        href : '#rvw-sbmt',
	        class : 'nav-link',
	        areaControl : 'rvw-sbmt',
	        listClass : 'nav-item list-group-item'
	    }
    ]
    // Stepper data end

	// Stepper form data service call start
    sendStepperFormData(){
	    this.stepperFormService.stepperFormEvent.emit(this.blocks);
	}
	// Stepper form data service call end

	// Function for stepper form control start
	testing(){
	    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	        $('a[data-toggle="tab"]').parent(".list-group-item").removeClass("active").removeClass("finished");
	    })
	    $('#applicant-dtls-tab').on('shown.bs.tab', function(e) {     
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#applicant-addr-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished"); 
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#kyc-doc-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $('#applicant-addr-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#services-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $('#applicant-addr-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#kyc-doc-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#others-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $('#applicant-addr-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#kyc-doc-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#services-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#payments-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $('#applicant-addr-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#kyc-doc-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#services-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#others-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $('#rvw-sbmt-tab').on('shown.bs.tab', function(e) {
	        $('#applicant-dtls-tab').parent(".list-group-item").removeClass("active").addClass("finished");  
	        $('#applicant-addr-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#kyc-doc-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#services-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#others-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $('#payments-tab').parent(".list-group-item").removeClass("active").addClass("finished");
	        $(this).parent(".list-group-item").addClass("active");
	    });
	    $("#proceed_1").on('click', function(){

	    });
	    $("#proceed_2").on('click', function(){

	    });
	    $("#proceed_3").on('click', function(){

	    });
	    $("#proceed_4").on('click', function(){

	    });
	    $("#proceed_5").on('click', function(){

	    });
	}
	// Function for stepper form control end

	get accountHolders() {
    	return this.applicantDetailsForm.get('accountHoldersControl') as FormArray;
    }

    get otherItems() {
    	return this.othersDetailsForm.get('otherItemsControl') as FormArray;
    }

    get Transactions() {
	    return this.paymentDetailsForm.get('transactionsControl') as FormArray;
	}

    get Documents() {
    	return this.kycDetailsForm.get('documentsControl') as FormArray;
    }

    get contracts() {
    	return this.serviceDetailsForm.get('serviceContractsControl') as FormArray;
    }

    addAccountHolderRow(){
    	if (this.accountHolders.length != 3) {
			this.accountHolders.push(this.formBuilder.group({first_name:[null, [Validators.required]], middle_name:[null], last_name:[null, [Validators.required]], type:[null, [Validators.required]]}));
    	}
    }

    addOtherItemsRow(){
    	this.otherItems.push(this.formBuilder.group({otherDropdownControl: [this.others,[Validators.required]], creditRatingControl: [null], offerControl: [null], upfPaymentControl : [null]}))
    }

    removeOtherItemsRow(index){
    	if (index != 0) {
    		this.otherItems.removeAt(index)
    	}else{
    		return false
    	}
    	
    }

    removeAccountHolderRow(index){
	    if (index != 0){
	      this.accountHolders.removeAt(index); 
	    }else{
	      return false
	    }
    }

    addDocumentRow(){
    	this.Documents.push(this.formBuilder.group({document_type_id:[null], document_sub_type_id:[null], file:[null]}));
    }

    removeDocumentRow(index){
	    if (index != 0){
	      this.Documents.removeAt(index); 
	    }else{
	      return false
	    }
    }

    addServiceContractRow(){
    	this.contracts.push(
    		this.formBuilder.group({
        		service:[null, [Validators.required]], 
        		category:[null, [Validators.required]], 
        		subCategory:[null, [Validators.required]], 
        		serviceContract:[null, [Validators.required]], 
        		premise:[null, [Validators.required]], 
        		meter:[null, [Validators.required]]
        	})
    	);
    }

    removeServiceContractRow(index){
	    if (index != 0){
	      this.contracts.removeAt(index); 
	    }else{
	      return false
	    }
    }

    // Applicant details form control start
    get ad() { return this.applicantDetailsForm.controls; }
    // Applicant details form control end

    // Address details form control start
    get add() { return this.addressDetailsForm.controls; }
    // Address details form control end

    // Payment details form control start
    get pd() { return this.paymentDetailsForm.controls; }
    // Payments details form control end

    // Service details form control start
    get sd() { return this.serviceDetailsForm.controls; }
    // Service details form control end

    // others details form control start
    get od() { return this.othersDetailsForm.controls; }
    // others details form control end

    // Applicant details form submit start
    onApplicantDetailsFormSubmit() {
        this.applicantDetailsFormSubmitted = true;

        if (this.applicantDetailsForm.invalid) {
            return;
        }else{
            this.stepperFormService.sendTrigger("#applicant-addr-tab")
        }
    }
    // Applicant details form submit end	

    // Address details form submit start
    onAddressDetailsFormSubmit() {
        this.addressDetailsFormSubmitted = true;
        if (this.addressDetailsForm.invalid) {
            return;
        }else{
	        this.stepperFormService.sendTrigger("#kyc-doc-tab")
        }
    }
    // Address details form submit end

    // KYC details form submit start
    onKycDetailsFormSubmit() {
    	this.kycDetailsFormSubmitted = true;
        if (this.kycDetailsForm.invalid) {
            return;
        }else{
	        this.stepperFormService.sendTrigger("#services-tab")
        }
        // for(let item of this.kycDetailsForm.value.documentsControl){
	       //  if(item.document_sub_type_id != null && item.document_type_id != null && item.file != null){
	       //    console.log(item.file.files)
	       //  }
        // }
    }
    // KYC details form submit end

    // Servie details form submit start
    onServiceDetailsFormSubmit() {
    	let paymentType = this.paymentTypes.filter(item => item.key == "CONSUMER")[0]
    	let paymentSubType = this.paymentSubTypes.filter(item => item.key == "DEPOSITE")[0]
    	this.Transactions.clear()
        this.serviceDetailsFormSubmitted = true;
        if (this.serviceDetailsForm.invalid) {
        	return;
        }else{
        	this.paymentDetailsForm.patchValue({
        		paymentTypeControl : paymentType,
        		paymentSubTypeControl : paymentSubType
        	})
        	for(let item of this.contracts.controls){
        		let transation = this.formBuilder.group({transaction_type_id:[null], transaction_sub_type_id:[null,[Validators.required]], transaction_amount:[null], tax_amount:[null]})
        		this.apiService.get('utility/service-contract/'+item.value.serviceContract.id_string).subscribe(data=>{
        			console.log(data)
        			transation.setValue({
	        			transaction_type_id : paymentType, 
				        transaction_sub_type_id : paymentSubType, 
				        transaction_amount : data['result'].deposite_amount, 
				        tax_amount : paymentSubType['tax']
	        		})
        		},error=>{
        			console.log(error.error)
        		})
        		this.Transactions.push(transation)
        	}
        	this.stepperFormService.sendTrigger("#others-tab")
        }
    }
    // Service details form submit end

    // Others details form submit start
    onOthersDetailsFormSubmit() {
        this.othersDetailsFormSubmitted = true;
        if (this.othersDetailsForm.invalid) {
        	return;
        }else{
        	this.stepperFormService.sendTrigger("#payments-tab")
        }
    }
    // Others details form submit end

    // Payment details form submit start
    onPaymentDetailsFormSubmit() {
        this.paymentsDetailsFormSubmitted = true;
        if (this.paymentDetailsForm.invalid) {
        	console.log(this.pd.paymentTypeControl.errors)
        	return;
        }else{
        	this.stepperFormService.sendTrigger("#rvw-sbmt-tab")
        }
    }
    // Payment details form submit end

    // Function for making both the address same start
    copyAddress(){
	    this.isAddressSame = !this.isAddressSame
	    if(this.isAddressSame == true){
	      this.addressDetailsForm.patchValue({
	        billingAddressLineControl : this.addressDetailsForm.get('addressLineControl').value,
	        billingStreetControl : this.addressDetailsForm.get('streetControl').value,
	        billingStateProvinceRegionControl : this.addressDetailsForm.get('stateProvinceRegionControl').value,
	        billingCityControl : this.addressDetailsForm.get('cityControl').value,
	        billingZipCodeControl : this.addressDetailsForm.get('zipCodeControl').value,
	        billingAreaControl : this.addressDetailsForm.get('areaControl').value,
	        billingSubAreaControl : this.addressDetailsForm.get('subAreaControl').value,
	      })
	    }else{
	      this.addressDetailsForm.controls.billingAddressLineControl.setValue(null)
	      this.addressDetailsForm.controls.billingStreetControl.setValue(null)
	      this.addressDetailsForm.controls.billingStateProvinceRegionControl.setValue(null)
	      this.addressDetailsForm.controls.billingCityControl.setValue(null)
	      this.addressDetailsForm.controls.billingZipCodeControl.setValue(null)
	      this.addressDetailsForm.controls.billingAreaControl.setValue(null)
	      this.addressDetailsForm.controls.billingSubAreaControl.setValue(null)
	    }
    }
    // Function for making both the address same end

    // Service value changes code start
    serviceChange(index){
    	this.consumerCategories = []
    	let service_id_string = this.contracts.at(index).value.service.id_string
    	// Consumer categories dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/category/list?service_id='+service_id_string).subscribe(data=>{
	      for(let item of data['results']){
	        this.consumerCategories.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Consumer categories dropdown api call end
    }
    // Service value changes code end

    // Category value changes code start
    categoryChange(index){
    	this.consumerSubCategories = []
    	let category_id_string = this.contracts.at(index).value.category.id_string
    	// Consumer sub categories dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/sub-category/list?category_id='+category_id_string).subscribe(data=>{
	      for(let item of data['results']){
	        this.consumerSubCategories.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Consumer sub categories dropdown api call end
    }
    // Category value changes code end

    // Sub category value changes code start
    subCategoryChange(index){
    	this.serviceContracts = []
    	let sub_category_id_string = this.contracts.at(index).value.subCategory.id_string
    	// Service contracts dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/service-contract/list?consumer_sub_category_id='+sub_category_id_string).subscribe(data=>{
	      for(let item of data['results']){
	        this.serviceContracts.push({
	        	name : item.name,
	        	id_string : item.id_string
	        })
	      }
	    })
	    // Service contracts dropdown api call end
    }
    // Sub category value changes code end

    // Service contract change code start
    serviceContractChange(index){
    	// Utility premise dropdown api call start
	    this.apiService.get('utility/'+this.utilityIdString+'/premise/list').subscribe(data=>{
		    for(let item of data['results']){
		        this.premises.push({
		        	name : item.name,
		        	id_string : item.id_string
		        })
		    }
	    })
	    // Utility premise dropdown api call end
    }
    // Service contract change code end

    // Premise value changes code start
    premiseChange(index){
    	this.meters = []
    	let premise_id_string = this.contracts.at(index).value.premise.id_string
    	let contract_id_string = this.contracts.at(index).value.serviceContract.id_string
    	// Meter dropdown api call start
	    this.apiService.get('consumer/'+this.utilityIdString+'/meter/list?premise_id='+premise_id_string
	    	+'&service_contract_id='+contract_id_string).subscribe(data=>{
		    for(let item of data['results']){
		        this.meters.push({
		        	name : item.meter.meter_make,
		        	id_string : item.meter.id_string
		        })
		    }
	    },error=>{console.log(error.statusText)})
	    // Meter dropdown api call end
    }
    // Premise value changes code end

    // Function for setting payment amount automatically start
    setPaymentAmount(){
	    let amount : number = 0
	    for (let item of this.Transactions.controls){
	    	console.log(item.status)
	        amount = amount + Number(item.value.transaction_amount) + (Number(item.value.transaction_amount) * (Number(item.value.tax_amount)/100))
	        // console.log(amount)
	    }
	    for(let item of this.otherItems.controls){
	    	if (item.value.otherDropdownControl.key == 'UPFPAYMENT') {
	    		amount = amount + Number(item.value.upfPaymentControl)
	    	}
	    }
	    this.paymentDetailsForm.controls.paymentAmountControl.setValue(amount)
	}
	// Function for setting payment amount automatically end

	// Function for consumer submit start
	onConsumerSubmit(){
		if (this.applicantDetailsForm.invalid) {
			alert("Fill applicant details first")
		}else if (this.addressDetailsForm.invalid) {
			alert("Fill address details first")
		}else if (this.kycDetailsForm.invalid) {
			alert("Fill kyc details first")
		}else if (this.serviceDetailsForm.invalid) {
			alert("Fill service details first")
		}else if (this.othersDetailsForm.invalid) {
			alert("Fill others details first")
		}else if (this.paymentDetailsForm.invalid) {
			alert("Fill payment details first")
		}else {
			let data = {
				utility : this.utilityIdString,
				email_id : this.applicantDetailsForm.value.emailControl,
				master_consumer_no : this.applicantDetailsForm.value.masterAccountNoControl,
				phone_mobile : this.applicantDetailsForm.value.mobileNoControl,
				billing_address_line_1 : this.addressDetailsForm.value.billingAddressLineControl,
				billing_street : this.addressDetailsForm.value.billingStreetControl,
				billing_zipcode : this.addressDetailsForm.value.billingZipCodeControl,
				billing_state_id : this.addressDetailsForm.value.billingStateProvinceRegionControl.id_string,
				billing_city_id : this.addressDetailsForm.value.billingCityControl.id_string,
				billing_area_id : this.addressDetailsForm.value.billingAreaControl.id_string,
				billing_sub_area_id : this.addressDetailsForm.value.billingSubAreaControl.id_string,
				// credit_rating_id : this.othersDetailsForm.value.creditRatingControl.id_string,
				account_type : this.applicantDetailsForm.value.accountTypeControl.id,
				ownership_id : this.applicantDetailsForm.value.ownershipControl.id_string,
				is_vip : this.applicantDetailsForm.value.vipControl.id,
				payment : {
			        utility : this.utilityIdString,
			        payment_type_id : this.paymentDetailsForm.value.paymentTypeControl.id_string,
			        payment_mode_id : this.paymentDetailsForm.value.paymentModeControl.id_string,
			        payment_channel_id : this.paymentDetailsForm.value.paymentChannelControl.id_string,
			        transaction_id : this.paymentDetailsForm.value.transactionIdControl,
			        transaction_amount : this.paymentDetailsForm.value.paymentAmountControl,
			        // transaction_date : this.paymentDetailsForm.value.transationDateControl
			    },
			    account_holders : [],
				services : [],
				transactions : [],
			}
			if (this.paymentDetailsForm.value.chequeDdControl != null) {
				data['payment']['cheque_dd_no'] = this.paymentDetailsForm.value.chequeDdControl
			}
			// if (this.othersDetailsForm.value.upfPaymentControl != '') {
			// 	data['upfPayment'] = this.othersDetailsForm.value.upfPaymentControl
			// }
			// if (this.othersDetailsForm.value.offerControl != '') {
			// 	data['offer_id'] = this.othersDetailsForm.value.offerControl.id_string
			// }
			for(let item of this.otherItems.controls){
				if(item.value.otherDropdownControl.key == 'CREDIT'){
					data['credit_rating_id'] = item.value.creditRatingControl.id_string
				}
				if(item.value.otherDropdownControl.key == 'OFFER'){
					data['offer_id'] = item.value.offerControl.id_string
				}
				if(item.value.otherDropdownControl.key == 'UPFPAYMENT'){
					data['upfPayment'] = item.value.upfPaymentControl
				}
			}
			for(let item of this.contracts.controls){
				data['services'].push({
					service_contract_id : item.value.serviceContract.id_string,
					premise_id : item.value.premise.id_string,
					is_new_meter : "False",
					existing_meter_id : item.value.meter.id_string
				})	
			}
			for(let item of this.accountHolders.controls){
				data['account_holders'].push({
					first_name : item.value.first_name,
					middle_name : item.value.middle_name,
					last_name : item.value.last_name,
					type : item.value.type.id
				})
			}
			for(let item of this.Transactions.controls){
				data['transactions'].push({
					transaction_type_id : item.value.transaction_type_id.id_string,
					transaction_sub_type_id : item.value.transaction_sub_type_id.id_string,
					transaction_amount : item.value.transaction_amount,
					tax_amount : item.value.tax_amount
				})
			}
			console.log(data)
			this.apiService.post("consumer/",data).subscribe(res=>{
				console.log(res)
			})
		}
	}
	// Function for consumer submit end

}
