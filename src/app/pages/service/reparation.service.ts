import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

interface Reparation {
  _id: string;
  rendezVousId: string;
  mecanicienId: string;
  voiture: {
    marque: string;
    modele: string;
    annee: number;
    immatriculation: string;
  };
  piecesRemplacees: { partId: string; nom: string; quantite: number; prix: number }[];
  statut: string;
  commentaire: string;
  factureTotale: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private apiUrl = environment.apiUrl + '/reparations';
  private apiPartsUrl = environment.apiUrl + '/parts';

  constructor(private http: HttpClient) {}

  // Récupérer les réparations d'un mécanicien
  getReparationsByMecanicien(mecanicienId: string): Observable<Reparation[]> {
    return this.http.get<Reparation[]>(`${this.apiUrl}/mecanicien/${mecanicienId}`);
  }

  // Mettre à jour une réparation (statut, pièces remplacées, facture)
  updateReparation(id: string, data: Partial<Reparation>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Récupérer la liste des pièces disponibles
  getPieces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiPartsUrl);
  }
}