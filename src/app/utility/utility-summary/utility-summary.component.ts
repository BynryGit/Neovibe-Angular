import { Component, OnInit, Directive, Input, HostBinding } from '@angular/core';
import * as AWS from 'aws-sdk';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { ErrorMessage } from '../../error-messages/error-messages';
import { CommonService } from 'src/app/common/common.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';

@Component({
  selector: 'app-utility-summary',
  templateUrl: './utility-summary.component.html',
  styleUrls: ['./utility-summary.component.scss']
})
export class UtilitySummaryComponent implements OnInit {

  constructor(private sessionService:SessionService,private filterService : FilterService,private apiService:ApiService,private commonService:CommonService) {
    this.apiService.get('utility/'+ this.utility_id_string_admin +'/document/list').subscribe(data=>{
      this.imageDetailList = data
      for(let item of this.imageDetailList){
        var str1 = item.document_generated_name
      }
      this.imageUrl = str1
      console.log("URL",this.imageUrl)
    },(err) => {
      this.imageUrl='../../../assets/images/no-image-available.png';
      this.showButton = true;
    });
   }
  imageDetailList:any=[];
  showButton:boolean = false;
  imageUrl;
  buttonUrl
  utility_id_string_admin = this.sessionService.getter("utility_id_string_admin")

  // getImageUrl(){
  //   AWS.config.update({
  //     region: 'us-east-1',
  //     accessKeyId: "AKIARUU5RUAA5CEDIZJG",
  //     secretAccessKey: "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"
  //   });

  //   var s4 = new AWS.S3({
  //     endpoint: new AWS.Endpoint('http://s3.amazonaws.com/'),
  //     s3ForcePathStyle: true
  //   });

  //   s4.getSignedUrl('getObject', {
  //     Bucket: 'smart360-new-bucket',
  //     Key: 'Development-Files/Meter-Image/logo-sample_3c5c12c0-c73d-4926-a4cb-aaefb13a9e12.jpg'
  //     }, function (err, url) {
  //         console.log(err, url);
  //     });
  // }

  ngOnInit(): void {
    
  }

}
