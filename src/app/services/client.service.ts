import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl = 'http://localhost:5000/api/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl);
  }

  getClient(id: string): Observable<Client> {
    const url = `${this.clientUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  addClient(client: Client): Observable<Client>  {
    return this.http.post<Client>(this.clientUrl, client);
  }

  updateClient(client: Client): Observable<Client>  {
    const url = `${this.clientUrl}/${client.id}`;
    return this.http.put<Client>(url , client);
  }

  deleteClient(id: string): Observable<Client> {
    const url = `${this.clientUrl}/${id}`;
    return this.http.delete<Client>(url);
  }

}
