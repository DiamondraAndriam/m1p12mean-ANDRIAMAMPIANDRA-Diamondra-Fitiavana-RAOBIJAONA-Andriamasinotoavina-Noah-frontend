import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReparationService } from '../service/reparation.service';
import { AuthService } from '../service/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReparationsDetailComponent } from './reparations-detail.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-reparations',
  standalone: true,
  templateUrl: './reparations.component.html',
  styleUrls: ['./reparations.component.scss'],
  providers: [DialogService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
    DropdownModule
  ],
})
export class ReparationsComponent implements OnInit {
  reparations: any[] = [];
  mecanicienId: string | null = null;
  loading: boolean = true;
  statusOptions = [
    { label: 'Tous', value: null },
    { label: 'À faire', value: 'à faire' },
    { label: 'En cours', value: 'en cours' },
    { label: 'Terminé', value: 'terminé' },
  ];
  
  selectedStatus: string | null = null;
  filteredReparations: any[] = [];

  constructor(
    private reparationService: ReparationService,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.mecanicienId = this.authService.getUserId();
    
    if (this.mecanicienId) {
      this.reparationService.getReparationsByMecanicien(this.mecanicienId).subscribe({
        next: (data) => {
          this.reparations = data;
          this.filteredReparations = data; // Initialisation de la liste affichée
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }  

  showDetails(reparation: any) {
    this.dialogService.open(ReparationsDetailComponent, {
      data: { reparation },
      header: 'Détails de la réparation',
      width: '50%'
    });
  }

  onGlobalFilter(dt: any, event: any) {
    dt.filterGlobal(event.target.value, 'contains');
  }

  filterByStatus() {
    if (!this.selectedStatus) {
      this.filteredReparations = this.reparations;
    } else {
      this.filteredReparations = this.reparations.filter(
        (rep) => rep.statut === this.selectedStatus
      );
    }
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'terminé':
        return 'success';
      case 'en cours':
        return 'info';
      case 'à faire':
        return 'warn';
      default:
        return 'secondary';
    }
  }  
}