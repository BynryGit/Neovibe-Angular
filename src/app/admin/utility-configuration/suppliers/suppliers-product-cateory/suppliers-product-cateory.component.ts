import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-suppliers-product-cateory',
  templateUrl: './suppliers-product-cateory.component.html',
  styleUrls: ['./suppliers-product-cateory.component.scss']
})
export class SuppliersProductCateoryComponent implements OnInit {
  productCategory: any= [];
  dtTrigger: Subject<any> = new Subject();
  utilityIdString = '3b104aa2-17f2-440f-afea-e49e79e4c0e5';
  dtOptions: DataTables.Settings = {};
  searchText;


  constructor(private filterService : FilterService,private apiService : ApiService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('supplier/'+this.utilityIdString+'/product-category'+'/list').subscribe(data=>{
      this.productCategory = data;
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


  ngOnInit(): void {
    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
    }
  }

  addProductCategoryData;

  onAddProductCategoryDatadata(){
    this.addProductCategoryData={
      name:this.productCategory.name,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",     
    }
    this.apiService.post('supplier/'+'product-category',this.addProductCategoryData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('supplier/'+this.utilityIdString+'/product-category'+'/list').subscribe(data=>{
        this.productCategory = data;
      })
    })
    console.log('result:',this.addProductCategoryData);
  }

  editProductCategoryData;

  onEditProductCategorydata(){
    this.editProductCategoryData={
      name:this.productCategory.name,
      utility_id:"3b104aa2-17f2-440f-afea-e49e79e4c0e5",
      tenant_id:"8cef5713-ffbb-448b-a87f-41ce4f600968",       
    }
    this.apiService.put('supplier/'+this.id_string+'/product-category',this.editProductCategoryData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('supplier/'+this.utilityIdString+'/product-category'+'/list').subscribe(data=>{
        this.productCategory = data;
      })
    })
    console.log('result:',this.editProductCategoryData);

  }

  id_string;

  onCardclickevent(item:any){
    this.id_string=item.id_string
    console.log(this.id_string);
  }
}
