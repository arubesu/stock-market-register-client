import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../models/stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stockUrl = 'http://localhost:5000/api/stocks';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockUrl);
  }

  getStock(id: string): Observable<Stock> {
    const url = `${this.stockUrl}/${id}`;
    return this.http.get<Stock>(url);
  }

  addStock(stock: Stock): Observable<Stock>  {
    return this.http.post<Stock>(this.stockUrl, stock);
  }

  updateStock(stock: Stock): Observable<Stock>  {
    const url = `${this.stockUrl}/${stock.id}`;
    return this.http.put<Stock>(url , stock);
  }

  deleteStock(id: string): Observable<Stock> {
    const url = `${this.stockUrl}/${id}`;
    return this.http.delete<Stock>(url);
  }

}

