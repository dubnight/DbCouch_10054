import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DbCouchService } from './dbcouch.service';
import { IDbCouch } from './dbcouch';

@Component({
    moduleId: module.id,
    templateUrl: 'screen_72500eng.component.html'
})
export class Screen_72500engComponent implements OnInit {
  private dbcouch: IDbCouch = {
  	id: 0,
  	address: '',	age: 0
  }
  ;

  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, private dbcouchservice: DbCouchService) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }


  create_DbCouch(){
      this.dbcouchservice.create_DbCouch(this.dbcouch)
          .subscribe(data => {
            console.log("data", data);
            this.toastr.success('Success!');
          },
          error => {
            this.toastr.error('Check the browser console to see more info.','Error!');
          });
  }
  get_all_DbCouch(){
      this.dbcouchservice.get_all_DbCouch()
          .subscribe(data => {
            console.log("data", data);
            this.toastr.success('Success!');
          },
          error => {
            this.toastr.error('Check the browser console to see more info.','Error!');
          });
  }

}