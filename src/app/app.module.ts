import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ClientManagerComponent } from './components/client-manager/client-manager.component';
import { StockManagerComponent } from './components/stock-manager/stock-manager.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MaskModule } from 'soft-angular-mask';
import { ToastrModule } from 'ng6-toastr-notifications';
@NgModule({
  declarations: [
    AppComponent,
    ClientManagerComponent,
    StockManagerComponent,
    OrderManagerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MaskModule,
    ToastrModule.forRoot()
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
