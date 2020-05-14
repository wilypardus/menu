
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerComponent } from './customer.component';




const customerRoutes: Routes = [

  {path: 'carta',
  component: CustomerComponent,
  children:[

{ path: ':cartaId', component: CustomerMenuComponent},



{ path: '', pathMatch: 'full', redirectTo: '' }
  ]}
];

export const CUSTOMER_ROUTES=RouterModule.forChild(customerRoutes);
