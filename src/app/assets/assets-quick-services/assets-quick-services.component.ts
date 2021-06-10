import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router,Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-assets-quick-services',
  templateUrl: './assets-quick-services.component.html',
  styleUrls: ['./assets-quick-services.component.scss']
})
export class AssetsQuickServicesComponent implements OnInit {

	faTimesCircle = faTimesCircle;
	  faMapMarkerAlt =  faMapMarkerAlt;
	  faPrint = faPrint;
	  faEye = faEye;
	  faChevronRight = faChevronRight;
	  faChevronLeft = faChevronLeft;
	  faPen = faPen;
	  faPlus = faPlus;
	  faFilePdf = faFilePdf;
	  faFileCsv = faFileCsv;
	  faFileExcel = faFileExcel;

	  scrollOptions = { 
	    autoHide: true, 
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
	  };

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  serviceBlocks = [
    {
      image: '../../../../assets/images/applicant-block-gen-card1.png',
      name: 'Allocation/ Reallocation',
      value: 1,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card3.png',
      name: 'Return',
      value: 2,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Transfer',
      value: 3,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card10.png',
      name: 'Expire',
      value: 4,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Insurance',
      value: 5,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card12.png',
      name: 'Transfer',
      value: 6,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card8.png',
      name: 'Maintenance',
      value: 7,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card9.png',
      name: 'Documents',
      value: 8,
    },
    {
      image: '../../../../assets/images/applicant-block-gen-card10.png',
      name: 'Contract',
      value: 9,
    }
  ];

  goToConsumerDetail() {
    this.router.navigate(['/asset/detail-view/'])
  }
  goToQuickAccess() {
    this.router.navigate(['/asset/quick-service/']);
  }
}
