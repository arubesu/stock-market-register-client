import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private toastr: ToastrManager) { }

  showSuccess(msg: string) {
    return this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg: string) {
   return this.toastr.errorToastr(msg, 'Oops!');
  }
}
