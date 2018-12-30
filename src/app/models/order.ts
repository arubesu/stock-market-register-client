import { Client } from './client';

export class Order {
  id: string;
  type: string;
  orderDate: any;
  clientId: string;
  stockCode: string;
  stockAmount: string;
  buyDate: any;
  orderValue: number;
  brokerageFee: number;
  incomeTax: number;
}
