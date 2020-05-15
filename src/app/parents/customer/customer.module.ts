import { CUSTOMER_ROUTES } from './customer.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerComponent } from './customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerSugerenciasComponent } from './customer-menu/customer-sugerencias.component';





@NgModule({
  declarations: [
    CustomerComponent,
    CustomerMenuComponent,
    CustomerSugerenciasComponent
  ],
  imports: [
    BrowserModule,
    CUSTOMER_ROUTES,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,



  ],
  providers: [],
  bootstrap: []
})
export class CustomerModule { }
