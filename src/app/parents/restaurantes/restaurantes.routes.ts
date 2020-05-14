import { MenusFirebaseComponent } from './menus-firebase/menus-firebase.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AdminMenuComponent } from 'src/app/parents/restaurantes/admin-menu/admin-menu.component';
import { VistaMenuComponent } from 'src/app/parents/restaurantes/vista-menu/vista-menu.component';
import { RestaurantesComponent } from './restaurantes.component';




const restaurantesRoutes: Routes = [

  {path: '',
  component: RestaurantesComponent,canActivate:[AuthGuard],
  children:[

{ path: 'menu/:id', component: MenuComponent, canActivate:[AuthGuard]},
{ path: 'user', component: UserSettingsComponent, canActivate:[AuthGuard]},
{ path: 'admin/:id', component: AdminMenuComponent, canActivate:[AuthGuard]},
{ path: 'menus', component: MenusFirebaseComponent, canActivate:[AuthGuard]},
{ path: 'preview/:id', component: VistaMenuComponent, canActivate:[AuthGuard]},


{ path: '', pathMatch: 'full', redirectTo: '/menus' }
  ]}
];

export const REST_ROUTES=RouterModule.forChild(restaurantesRoutes);
