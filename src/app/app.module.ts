import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientManagerComponent } from './components/client-manager/client-manager.component';
import { StockManagerComponent } from './components/stock-manager/stock-manager.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientManagerComponent,
    StockManagerComponent,
    OrderManagerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
