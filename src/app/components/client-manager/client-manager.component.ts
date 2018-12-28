import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Client } from 'src/app/models/client';
import moment from 'moment';

@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrls: ['./client-manager.component.css']
})
export class ClientManagerComponent implements OnInit {
  isEditing = false;
  buttonAction = 'Save';
  selectedClient: Client;

  displayedColumns: string[] = [
    'name',
    'birthDate',
    'cpfCnpj',
    'personType',
    'actions'
  ];
  dataSource = new MatTableDataSource<Client>();

  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cpfCnpj: new FormControl(''),
    birthDate: new FormControl('', Validators.required),
    personType: new FormControl('', Validators.required)
  });

  clients: Client[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  saveClient() {
    const client: Client = new Client();
    this.mapClientProperties(client);
    this.clientService.addClient(client).subscribe(() => {
      this.clearFields();
      this.getClients();
    });
  }

  performAction() {
    if (this.isEditing) {
      this.editClient();
      return;
    }
    this.saveClient();
  }

  editClient() {
    this.mapClientProperties(this.selectedClient);
    this.clientService.updateClient(this.selectedClient).subscribe(() => {
      this.clearFields();
      this.getClients();
      this.isEditing = false;
      this.changeButtonTitle();
    });
  }

  mapClientProperties(client: Client) {
    client.name = this.clientForm.controls['name'].value;
    client.birthDate = moment(
      this.clientForm.controls['birthDate'].value
    ).format('YYYY-MM-DDT00:00:00');
    client.personType = this.clientForm.controls['personType'].value;
    client.cpfCnpj = this.clientForm.controls['cpfCnpj'].value;
  }

  getClients() {
    return this.clientService.getClients().subscribe(clientsData => {
      this.clients = clientsData;
      this.dataSource.data = clientsData;
    });
  }

  clearFields() {
    this.clientForm.reset();
  }

  cancel() {
    this.clearFields();
    this.isEditing = false;
    this.changeButtonTitle();
  }

  loadClient(id: string) {
    const client = this.clients.find(c => c.id === id);
    if (client) {
      this.clientForm.controls['name'].setValue(client.name);
      this.clientForm.controls['birthDate'].setValue(client.birthDate);
      this.clientForm.controls['personType'].setValue(client.personType);
      this.clientForm.controls['cpfCnpj'].setValue(client.cpfCnpj);
      this.isEditing = true;
      this.selectedClient = client;
      this.changeButtonTitle();
    }
  }

  changeButtonTitle() {
    this.buttonAction = this.isEditing ? 'Edit' : 'Save';
  }

  delete(id: string) {
    return this.clientService.deleteClient(id).subscribe(() => {
      this.getClients();
    });
  }
}
