import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './parents/restaurantes/menu/menu.component';

import { MenusComponent } from './pages/menus/menus.component';
import { VistaMenuComponent } from './parents/restaurantes/vista-menu/vista-menu.component';
import { LoginComponent } from './auth/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './auth/register.component';

import { PruebasComponent } from './pruebas/pruebas.component';
import { ChatComponent } from './component/chat/chat.component';
import { ChatService } from './services/chat.service';
import { MenusFirebaseComponent } from './parents/restaurantes/menus-firebase/menus-firebase.component';
import { CustomerMenuComponent } from './parents/customer/customer-menu/customer-menu.component';
import { AdminMenuComponent } from './parents/restaurantes/admin-menu/admin-menu.component';
import { UserSettingsComponent } from './parents/restaurantes/user-settings/user-settings.component';
import { UploadComponent } from './component/upload/upload.component';
import { SetMenuComponent } from './pages/set-menu/set-menu.component';
import { RestaurantesModule } from './parents/restaurantes/restaurantes.module';
import { CustomerModule } from './parents/customer/customer.module';



@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    // MenuComponent,

    // MenusComponent,

    // VistaMenuComponent,

    LoginComponent,

    RegisterComponent,



    // PruebasComponent,

    // ChatComponent,

    // MenusFirebaseComponent,



    // AdminMenuComponent,

    // UserSettingsComponent,





    // UploadComponent,





    SetMenuComponent,


  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RestaurantesModule,
    CustomerModule


  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
