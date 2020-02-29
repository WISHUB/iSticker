import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { AuthService } from './auth.service';
import { SwalService } from './swal.service';
import { ApiService } from './api.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    SwalService,
    ApiService,
    AuthService
  ]
})
export class ServiceModule { }
