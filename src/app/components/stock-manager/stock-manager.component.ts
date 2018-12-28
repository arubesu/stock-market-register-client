import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Stock } from 'src/app/models/stock';
import moment from 'moment';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  isEditing = false;
  buttonAction = 'Save';
  selectedStock: Stock;

  displayedColumns: string[] = [
    'code',
    'date',
    'price',
    'actions'
  ];
  dataSource = new MatTableDataSource<Stock>();

  stockForm = new FormGroup({
    code: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  stocks: Stock[];

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.getStocks();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  saveStock() {
    const stock: Stock = new Stock();
    this.mapStockProperties(stock);
    this.stockService.addStock(stock).subscribe(() => {
      this.clearFields();
      this.getStocks();
    });
  }

  performAction() {
    if (this.isEditing) {
      this.editStock();
      return;
    }
    this.saveStock();
  }

  editStock() {
    this.mapStockProperties(this.selectedStock);
    this.stockService.updateStock(this.selectedStock).subscribe(() => {
      this.clearFields();
      this.getStocks();
      this.isEditing = false;
      this.changeButtonTitle();
    });
  }

  mapStockProperties(stock: Stock) {
    stock.code = this.stockForm.controls['code'].value;
    stock.date = moment(
      this.stockForm.controls['date'].value
    ).format('YYYY-MM-DDT00:00:00');
    stock.price = this.stockForm.controls['price'].value;
  }

  getStocks() {
    return this.stockService.getStocks().subscribe(stocksData => {
      this.stocks = stocksData;
      this.dataSource.data = stocksData;
    });
  }

  clearFields() {
    this.stockForm.reset();
  }

  cancel() {
    this.clearFields();
    this.isEditing = false;
    this.changeButtonTitle();
  }

  loadStock(id: string) {
    const stock = this.stocks.find(s => s.id === id);
    if (stock) {
      this.stockForm.controls['code'].setValue(stock.code);
      this.stockForm.controls['date'].setValue(stock.date);
      this.stockForm.controls['price'].setValue(stock.price);
      this.isEditing = true;
      this.selectedStock = stock;
      this.changeButtonTitle();
    }
  }

  changeButtonTitle() {
    this.buttonAction = this.isEditing ? 'Edit' : 'Save';
  }

  delete(id: string) {
    return this.stockService.deleteStock(id).subscribe(() => {
      this.getStocks();
    });
  }
}

