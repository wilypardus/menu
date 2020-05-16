import { PricingComponent } from './pricing.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home.component';
import { WebComponent } from './web.component';
import { ForgotComponent } from './auth/forgot.component';





const webRoutes: Routes = [

  {path: '',
  component: WebComponent,
  children:[

{ path: '', component: HomeComponent},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'forgot', component: ForgotComponent},
{ path: 'precio', component: PricingComponent},



{ path: '', pathMatch: 'full', redirectTo: '' }
  ]}
];

export const WEB_ROUTES=RouterModule.forChild(webRoutes);
