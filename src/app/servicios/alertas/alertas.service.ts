import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  


  constructor(private toastr: ToastrService) { 
  }

  showSuccess(message: string, title: string) {
   
    this.toastr.success(` ${title} - ${message}`);
  }

      showError(title: string) {
        
        alert(` ${title}`);
      }
}

