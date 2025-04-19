import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ServiceService, Service } from '../../service/service.service';

@Component({
  selector: 'app-service',
  standalone: true,
  templateUrl: './service.component.html',
  imports: [
    CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
  ],
  providers: 
  [
    MessageService, ServiceService, ConfirmationService
  ]
})
export class ServiceComponent implements OnInit {
  serviceDialog: boolean = false;

  service !: Service;

  submitted: boolean = false;

  typesMecanicien: any[] = [
    { name: 'Mécanicien', code: 'mecanicien' },
    { name: 'Électricien', code: 'electricien' },
    { name: 'Carrossier', code: 'carrossier' },
    { name: 'Dépanneur', code: 'depanneur' },
    { name: 'Autre', code: 'autre' }
  ];

    constructor(
      private serviceService: ServiceService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
    }
    
    openNew() {
      this.service = {};
      this.submitted = false;
      this.serviceDialog = true;
    }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  saveService() {
    this.submitted = true;
    if (this.service.nom?.trim()) {
      this.serviceService.newService(this.service).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Service créé avec succès',
            life: 3000,
          });
          this.serviceDialog = false;
        }
      );
    }
  }
}