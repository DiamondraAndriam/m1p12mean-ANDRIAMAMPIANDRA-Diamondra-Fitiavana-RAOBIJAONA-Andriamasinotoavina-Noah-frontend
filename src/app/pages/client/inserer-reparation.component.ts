import { Component } from '@angular/core';
import { ConfirmationService } from '../service/confirmation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  imports: [
    CommonModule,
  ]
})
export class ReparationComponent {
  messageConfirmation: string = '';

  reparation = {
    email: 'raobijaonanoah3@gmail.com',
    nomClient: 'Jean Dupont',
    date: '2025-04-10',
    heure: '14:00',
    service: 'Changement d’huile',
    mecanicien: 'Michel Mécano'
  };

  constructor(private confirmationService: ConfirmationService) {}

  confirmerReparation(): void {
    this.confirmationService.envoyerConfirmation(this.reparation).subscribe({
        next: () => {
          this.messageConfirmation = 'Réparation confirmée ! Un email a été envoyé au client.';
        },
        error: (error) => {
          console.error('Erreur envoi confirmation:', error);
          this.messageConfirmation = 'Une erreur est survenue lors de l’envoi de l’email.';
        }
    });
  }
}