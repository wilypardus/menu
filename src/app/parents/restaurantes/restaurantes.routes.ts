import { MenusFirebaseComponent } from './menus-firebase/menus-firebase.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AdminMenuComponent } from 'src/app/parents/restaurantes/admin-menu/admin-menu.component';
import { VistaMenuComponent } from 'src/app/parents/restaurantes/vista-menu/vista-menu.component';
import { RestaurantesComponent } from './restaurantes.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { SugerenciasComponent } from './menu/sugerencias.component';



const restaurantesRoutes: Routes = [

  {path: 'admin',
  component: RestaurantesComponent,canActivate:[AngularFireAuthGuard],
  children:[

{ path: 'menu/:id', component: MenuComponent, canActivate:[AngularFireAuthGuard]},
{ path: 'user', component: UserSettingsComponent, canActivate:[AngularFireAuthGuard]},
{ path: 'admin/:id', component: AdminMenuComponent, canActivate:[AngularFireAuthGuard]},
{ path: 'menus', component: MenusFirebaseComponent, canActivate:[AngularFireAuthGuard]},
{ path: 'sugerencias/:id', component: SugerenciasComponent, canActivate:[AngularFireAuthGuard]},
{ path: 'preview/:id', component: VistaMenuComponent, canActivate:[AngularFireAuthGuard]},


{ path: '', pathMatch: 'full', redirectTo: '/menus' }
  ]}
];

export const REST_ROUTES=RouterModule.forChild(restaurantesRoutes);
