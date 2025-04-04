import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { FinanceService } from '../service/finance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  imports: [TableModule, ChartModule, CommonModule, FormsModule],
})
export class FinanceDashboardComponent implements OnInit {
  revenusChartData: any;
  revenusChartOptions: any;
  revenusParService: any[] = [];
  selectedYear: number = new Date().getFullYear(); // Valeur par défaut: année actuelle
  years: number[] = []; // Liste des années disponibles

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadAvailableYears();
    this.loadRevenusParMois();
    this.loadRevenusParService();
  }

  // Charger les années disponibles (vous pouvez ajuster cette logique selon votre besoin)
  loadAvailableYears() {
    const currentYear = new Date().getFullYear();
    // Générer une liste d'années de 5 ans avant l'année actuelle jusqu'à l'année actuelle
    for (let year = currentYear - 5; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  // Charger les revenus par mois pour une année donnée
  loadRevenusParMois(): void {
    if (!this.selectedYear) return;  // Assurez-vous qu'une année soit sélectionnée
    this.financeService.getRevenusParMois(this.selectedYear).subscribe((data) => {
      const labels = data.map((item: any) => `${item.nom}`);
      const values = data.map((item: any) => item.totalRevenu);
  
      this.revenusChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Revenus en MGA',
            data: values,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            fill: false,
          },
        ],
      };
  
      this.revenusChartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      };
    });
  }

  // Charger les revenus par service
  loadRevenusParService() {
    this.financeService.getRevenusParService().subscribe((data) => {
      this.revenusParService = data;
    });
  }

  // Fonction pour gérer la sélection d'une année
  onYearChange(year: number) {
    this.selectedYear = year;
    this.loadRevenusParMois();
  }
}