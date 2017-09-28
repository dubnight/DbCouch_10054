import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Screen_72500engComponent } from './screen_72500eng.component';
import { MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DbCouchService } from './dbcouch.service';

@NgModule({
    declarations: [
        Screen_72500engComponent
    ],
    imports: [
        MdInputModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'Screen_72500eng', component: Screen_72500engComponent}
        ]),
        Ng2Bs3ModalModule,
        BrowserAnimationsModule
    ],
    providers:[
        DbCouchService
    ]
})

export class DbCouchModule {

}