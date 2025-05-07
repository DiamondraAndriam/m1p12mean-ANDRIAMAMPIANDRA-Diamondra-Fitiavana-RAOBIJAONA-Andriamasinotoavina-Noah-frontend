import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl; 

  constructor(private http : HttpClient) { }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  getServiceById(serviceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/services/${serviceId}`);
  }

  getMecaniciensDisponibles(serviceId: string, start: Date): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/mecaniciens/disponible`, {
      serviceId: serviceId,
      date : start.getDate(),
      heureDebut : start.getHours()
    });
  }

  getWorksHours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/worksHours`);
  }

  getUnavailableDates(serviceId: string, month: number, year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/indisponibilites/`, {
      params: { 
        month: month.toString(),
        serviceId: serviceId,
        year: year.toString()
      }
    });
  }

  getCreneaux(serviceId: string, date: Date): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/creneaux/${serviceId}`, {
      params: { date: date.toISOString() }
    });
  }
}
