import { REST_ROUTES } from './restaurantes.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
//import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';


// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './../../app.component';
// import { TemplateComponent } from './pages/template/template.component';
// import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './menu/menu.component';

// import { MenusComponent } from './menus/menus.component';
import { VistaMenuComponent } from './vista-menu/vista-menu.component';
// import { LoginComponent } from '../../auth/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { RegisterComponent } from '../../auth/register.component';
import { HeaderComponent } from './header/header.component';
// import { PruebasComponent } from './pruebas/pruebas.component';
import { ChatComponent } from '../../component/chat/chat.component';
// import { ChatService } from './services/chat.service';
import { MenusFirebaseComponent } from './menus-firebase/menus-firebase.component';
//import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UploadComponent } from '../../component/upload/upload.component';
// import { SetMenuComponent } from './pages/set-menu/set-menu.component';
import { RestaurantesComponent } from './restaurantes.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PipesModule } from '../../pipes/pipes.module';
import { SugerenciasComponent } from './menu/sugerencias.component';
import { SugerenciasFirebaseComponent } from './menus-firebase/sugerencias-firebase.component';



@NgModule({
  declarations: [
    // AppComponent,
    // TemplateComponent,
    // ReactiveComponent,
    MenuComponent,

    // MenusComponent,

    VistaMenuComponent,

    // LoginComponent,

    // RegisterComponent,

    HeaderComponent,

    // PruebasComponent,

    ChatComponent,

    MenusFirebaseComponent,

    // CustomerMenuComponent,

    AdminMenuComponent,

    UserSettingsComponent,





    UploadComponent,
    RestaurantesComponent,
    SugerenciasComponent,
    SugerenciasFirebaseComponent





    // SetMenuComponent,


  ],
  imports: [
    BrowserModule,
    REST_ROUTES,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    QRCodeModule,
    PipesModule


  ],
  providers: [],
  exports:[
    HeaderComponent,
  ],

  bootstrap: []
})
export class RestaurantesModule { }

