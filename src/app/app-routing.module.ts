import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientManagerComponent } from './components/client-manager/client-manager.component';
import { StockManagerComponent } from './components/stock-manager/stock-manager.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: ClientManagerComponent },
  { path: 'stocks', component: StockManagerComponent },
  { path: 'orders', component: OrderManagerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
