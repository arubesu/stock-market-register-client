import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Order } from 'src/app/models/order';
import * as moment from 'moment';
import { Client } from 'src/app/models/client';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { error } from 'util';
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  isOrderTypeBuy = false;
  maxDate: Date = new Date();
  displayedColumns: string[] = [
    'type',
    'orderDate',
    'client',
    'stockCode',
    'stockAmount',
    'buyDate',
    'orderValue',
    'brokerageFee',
    'incomeTax'
  ];

  dataSource = new MatTableDataSource<Order>();

  orderForm = new FormGroup({
    type: new FormControl('', Validators.required),
    orderDate: new FormControl('', Validators.required),
    clientId: new FormControl('', Validators.required),
    stockCode: new FormControl('', Validators.required),
    stockAmount: new FormControl('', Validators.required),
    buyDate: new FormControl('')
  });

  clients: Client[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  disableBuyDateField(event) {
    if (event.value === 'C') {
      this.isOrderTypeBuy = true;
      this.orderForm.controls['buyDate'].clearValidators();
      return;
    }
    this.isOrderTypeBuy = false;
    this.orderForm.controls['buyDate'].setValidators([Validators.required]);
  }

  constructor(
    private clientService: ClientService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getClients();
    this.getOrders();
    this.onChanges();
  }

  getClients() {
    return this.clientService.getClients().subscribe(clientsData => {
      this.clients = clientsData;
    });
  }

  getOrders() {
    return this.orderService.getOrders().subscribe(ordersData => {
      ordersData.map(orderCallback => {
        orderCallback.type = this.mapOrderType(orderCallback);
        orderCallback.clientId = this.fillClientsNames(orderCallback);
      });
      this.dataSource.data = ordersData;
    });
  }

  fillClientsNames(order) {
    return this.clients.find(c => c.id === order.clientId ).name
  }

  mapOrderType(order){
    return order.type === 'C' ? 'Compra' : 'Venda' ;
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onChanges(): void {
    this.orderForm.get('orderDate').valueChanges.subscribe(val => {
      this.maxDate = new Date(val - 1);
    });
  }

  clearFields() {
    this.orderForm.reset();
  }

  saveOrder() {
    const order: Order = new Order();
    this.mapOrderProperties(order);
    this.orderService.addOrder(order).subscribe(() => {
      this.clearFields();
      this.getOrders();
      this.notificationService.showSuccess('order created successfully');
    },(err) => {this.notificationService.showError('There is no quotation for the order date.')});

  }

  mapOrderProperties(order: Order) {
    order.type = this.orderForm.controls['type'].value;
    order.orderDate = moment(this.orderForm.controls['orderDate'].value).format(
      'YYYY-MM-DDT00:00:00'
    );
    order.clientId = this.orderForm.controls['clientId'].value;
    order.stockCode = this.orderForm.controls['stockCode'].value;
    if (order.type === 'V') {
      order.buyDate = moment(this.orderForm.controls['buyDate'].value).format(
        'YYYY-MM-DDT00:00:00'
      );
    }

    order.stockAmount = this.orderForm.controls['stockAmount'].value;
  }
}
