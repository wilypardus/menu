import { UploadComponent } from './component/upload/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { MenuComponent } from './parents/restaurantes/menu/menu.component';
import { MenusComponent } from './pages/menus/menus.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AuthGuard } from './guards/auth.guard';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MenusFirebaseComponent } from './parents/restaurantes/menus-firebase/menus-firebase.component';
import { CustomerMenuComponent } from './parents/customer/customer-menu/customer-menu.component';
import { AdminMenuComponent } from './parents/restaurantes/admin-menu/admin-menu.component';
import { UserSettingsComponent } from './parents/restaurantes/user-settings/user-settings.component';
import { SetMenuComponent } from './pages/set-menu/set-menu.component';
import { VistaMenuComponent } from './parents/restaurantes/vista-menu/vista-menu.component';
import { WebComponent } from './parents/web/web.component';
import { HomeComponent } from './parents/web/home.component';



const appRoutes: Routes = [
// { path: 'template', component: TemplateComponent },
// { path: 'reactivo', component: ReactiveComponent },
// { path: 'upload', component: UploadComponent },
// { path: 'menu/:id', component: MenuComponent, canActivate:[AuthGuard]},
// // { path: 'menu2/:id', component: SetMenuComponent, canActivate:[AuthGuard]},
// { path: 'user', component: UserSettingsComponent, canActivate:[AuthGuard]},
// // { path: 'menus', component: MenusComponent, canActivate:[AuthGuard]},
// { path: 'admin/:id', component: AdminMenuComponent, canActivate:[AuthGuard]},
// { path: 'menus', component: MenusFirebaseComponent, canActivate:[AuthGuard]},

{ path: '', component: WebComponent},
// { path: 'login', component: LoginComponent},
// { path: 'register', component: RegisterComponent},
// // { path: 'pruebas', component: PruebasComponent},
// { path: 'u/:id', component: CustomerMenuComponent},
// { path: 'revisualización/:id', component: VistaMenuComponent, canActivate:[AuthGuard]},


{ path: '**', pathMatch: 'full', redirectTo: '' }

];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash:true });
