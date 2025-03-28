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
  piecesRemplacees: { nom: string; prix: number }[];
  statut: string;
  commentaire: string;
  factureTotale: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private apiUrl = environment.apiUrl+'/reparations';

  constructor(private http: HttpClient) {}

  getReparationsByMecanicien(mecanicienId: string): Observable<Reparation[]> {
    const result = this.http.get<Reparation[]>(`${this.apiUrl}/mecanicien/${mecanicienId}`);
    return result;
  }
}