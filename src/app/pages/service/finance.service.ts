import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private baseUrl = environment.apiUrl + '/finance';

  constructor(private http: HttpClient) {}

  getRevenusParMois(annee: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/revenus/mois/${annee}`);
  }

  getRevenusParService(): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenus/service`);
  }
}
