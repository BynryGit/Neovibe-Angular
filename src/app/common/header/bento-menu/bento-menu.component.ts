import { Component, OnInit } from '@angular/core';
import { faChevronDown, faSearch, faMapMarkerAlt, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'underscore';
import * as lodash from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'smart360-bento-menu',
  templateUrl: './bento-menu.component.html',
  styleUrls: ['./bento-menu.component.scss']
})
export class BentoMenuComponent implements OnInit {
  faSearch = faSearch;
  faChevronDown = faChevronDown;
  faMapMarkerAlt = faMapMarkerAlt;
  faBell = faBell;
  faPlus = faPlus;

  menuScrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  notificationScrollOptions = {
    autoHide: true,
    scrollbarMinSize: 33,
    scrollbarMaxSize: 99,
  };
  finalModuleList: any;
  finalModuleLists: any;
  path = '../../../assets/images/';
  imgpath = "../../../assets/images/";

  modulesList = {
    data: [
      { no: 1, label: 'CX', img: this.path + 'bento-menu-1.png', img1: this.imgpath + 'bento-menu-bg-1.png' },
      { no: 2, label: 'MX', img: this.path + 'bento-menu-2.png', img1: this.imgpath + 'bento-menu-bg-2.png' },
      { no: 3, label: 'BX', img: this.path + 'bento-menu-3.png', img1: this.imgpath + 'bento-menu-bg-1.png' },
      { no: 4, label: 'WX', img: this.path + 'bento-menu-4.png', img1: this.imgpath + 'bento-menu-bg-3.png' },
      { no: 5, label: 'AX', img: this.path + 'bento-menu-5.png', img1: this.imgpath + 'bento-menu-bg-4.png' },
      { no: 6, label: 'SX', img: this.path + 'bento-menu-6.png', img1: this.imgpath + 'bento-menu-bg-5.png' },
      { no: 7, label: 'USER', img: this.path + 'bento-menu-7.png', img1: this.imgpath + 'bento-menu-bg-6.png' },
      { no: 8, label: 'ADMIN', img: this.path + 'bento-menu-1.png', img1: this.imgpath + 'bento-menu-bg-1.png' },
      { no: 9, label: 'REPORT', img: this.path + 'bento-menu-1.png', img1: this.imgpath + 'bento-menu-bg-1.png' },
    ]
  };

  // On mouseover Display Detail info of module 
  selectedVal: any = { id: 1, module: '', img: '', img1: '', short_desc: '', long_desc: '' }
  mouseHovered(val) {
    this.selectedVal = this.finalModuleList.find(data => data.label === val)
  }
  user;
  uniqueModule;
  constructor(private getData: CommonService, private sessionService: SessionService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    // Display module list at time of login
    this.getData.changeTabSource.subscribe(utility_id_string => { // taking utility id_string from subject subscription(from common service)
      this.user = this.sessionService.getter("loginUser")
      console.log('----this.user-----',this.sessionService.getter("loginUser"))
      if((this.user) == 'Utility'){
        this.getData.getModuleByUserUtility(utility_id_string).subscribe((moduleList: any) => {
          this.sessionService.setter("role_id_string", moduleList.data[0].role_id_string)
          this.uniqueModule = lodash.uniqBy(moduleList.data, function (e) {
            return e.id_string;
          });
  
          this.finalModuleLists = this.uniqueModule.map((a) => {
            let obj2 = this.modulesList.data.find((b) => a.name == b.label);
            if (obj2)
              Object.assign(a, obj2);
            return a;
          });
  
          //sort the array of object to number start
          this.finalModuleList = _.sortBy(this.finalModuleLists, 'no');
          //sort the array of object to number end
  
          var moduleId = this.sessionService.getter("module_id_string")
          if (moduleId) {
            this.sessionService.setter("module_id_string", moduleId)
          } else {
            this.sessionService.setter("module_id_string", this.finalModuleList[0].id_string)
          }
  
          //bydefault load side nav page start
          this.getData.passModuleIdStringToNav(moduleId || this.finalModuleList[0].id_string)
          //bydefault load side nav page end
        },
          (err) => {
            if (err?.error?.state == "error") {
              this.showErrorMsg = false;
            }
          }
        );
      }else{
        this.getData.getModuleByUserTenant(utility_id_string).subscribe((moduleList: any) => {
          this.sessionService.setter("role_id_string", moduleList.data[0].role_id_string)
          this.uniqueModule = lodash.uniqBy(moduleList.data, function (e) {
            return e.id_string;
          });
  
          this.finalModuleLists = this.uniqueModule.map((a) => {
            let obj2 = this.modulesList.data.find((b) => a.name == b.label);
            if (obj2)
              Object.assign(a, obj2);
            return a;
          });
  
          //sort the array of object to number start
          this.finalModuleList = _.sortBy(this.finalModuleLists, 'no');
          //sort the array of object to number end
  
          var moduleId = this.sessionService.getter("module_id_string")
          if (moduleId) {
            this.sessionService.setter("module_id_string", moduleId)
          } else {
            this.sessionService.setter("module_id_string", this.finalModuleList[0].id_string)
          }
  
          //bydefault load side nav page start
          this.getData.passModuleIdStringToNav(moduleId || this.finalModuleList[0].id_string)
          //bydefault load side nav page end
        },
          (err) => {
            if (err?.error?.state == "error") {
              this.showErrorMsg = true
            }
          }
        );
      }
    });
  }

  //Set Module values on click of bentomenu module
  selectModuleId(moduleId_string, module, role_id_string) {
    this.sessionService.setter("module_id_string", moduleId_string)
    this.sessionService.setter("role_id_string", role_id_string)
    this.getData.passModuleIdStringToNav(moduleId_string)
  }


  modules: any = [];
  module_list: any = [];

  showErrorMsg: boolean = false;
  env;
  ngOnInit(): void {
    this.env = environment.environment;
    $(document).ready(function () {
      $(document).on('click', '.bento-dropdown .dropdown-menu', function (e) {
        e.stopPropagation();
      });
    });


  }
}
