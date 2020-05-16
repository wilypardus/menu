import { WEB_ROUTES } from './web.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';

import { WebComponent } from './web.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ForgotComponent } from './auth/forgot.component';
import { PricingComponent } from './pricing.component';
import { ContactComponent } from './contact/contact.component';




@NgModule({
  declarations: [
HomeComponent,
WebHeaderComponent,
WebComponent,
LoginComponent,
RegisterComponent,
ForgotComponent,
PricingComponent,
ContactComponent


  ],
  imports: [
    BrowserModule,
    WEB_ROUTES,
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
  exports:[
    HomeComponent,
    WebHeaderComponent
,
  ],

  bootstrap: []
})
export class WebModule { }

