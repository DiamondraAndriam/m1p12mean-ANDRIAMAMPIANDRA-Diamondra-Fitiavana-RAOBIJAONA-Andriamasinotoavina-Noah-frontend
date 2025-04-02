import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ReparationService } from '../service/reparation.service';

@Component({
  selector: 'app-reparations-detail',
  templateUrl: './reparations-detail.component.html',
  imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule],
})
export class ReparationsDetailComponent {
  reparation: any;
  piecesDisponibles: any[] = [];
  selectedPiece: any;
  quantitePiece: number = 1;
  loading: boolean = false;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private reparationService: ReparationService) {
    this.reparation = config.data.reparation;
  }

  ngOnInit() {
    this.loadPieces();
  }

  // Charger la liste des pièces disponibles depuis l'API
  loadPieces() {
    this.reparationService.getPieces().subscribe((data) => {
      this.piecesDisponibles = data;
    });
  }

  // Ajouter une pièce remplacée
  ajouterPiece(): void {
    if (!this.selectedPiece || this.quantitePiece < 1) return;
  
    const pieceExistante = this.reparation.piecesRemplacees.find(
      (p: any) => p.partId._id === this.selectedPiece._id
    );
  
    if (pieceExistante) {
      pieceExistante.quantite += this.quantitePiece;
    } else {
      this.reparation.piecesRemplacees.push({
        partId: this.selectedPiece,
        quantite: this.quantitePiece,
        prix: this.selectedPiece.price * this.quantitePiece
      });
    }
  
    this.updateFacture();
  }  

  // Supprimer une pièce
  supprimerPiece(index: number) {
    this.reparation.piecesRemplacees.splice(index, 1);
    this.updateFacture();
  }

  updateFacture(): void {
    this.reparation.factureTotale = this.reparation.piecesRemplacees.reduce(
      (total: number, piece: { prix: number }) => total + piece.prix, 
      0
    );
  }  

  // Sauvegarder les modifications dans la base de données
  sauvegarderModifications(): void {
    this.loading = true;

    const updateData = {
      statut: this.reparation.statut,
      piecesRemplacees: this.reparation.piecesRemplacees.map(
        (piece: { partId: string; quantite: number; prix: number }) => ({
          partId: piece.partId,
          quantite: piece.quantite,
          prix: piece.prix
        })
      ),
      factureTotale: this.reparation.factureTotale
    };
  
    this.reparationService.updateReparation(this.reparation._id, updateData).subscribe({
      next: () => {
        this.loading = false;
        // this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Réparation mise à jour' });
      },
      error: () => {
        this.loading = false;
        // this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour' });
      }
    });
  }  
}