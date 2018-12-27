import { Client } from './client';

export class Order {
  id: string;
  type: string;
  orderDate: Date;
  client: Client;
  stockCode: string;
  stockAmount: string;
  buyDate: Date;
  orderValue: number;
  brokerageFee: number;
  incomeTax: number;
}
