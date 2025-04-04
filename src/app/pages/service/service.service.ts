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

  getServiceUnavailability(serviceId: string, month: number, year: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/services/indisponible/${serviceId}`, {
        params: { month: month.toString(), year: year.toString() }
      });
    }

  getMecaniciensDisponibles(serviceId: string, start: Date, end: Date): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/mecaniciens/disponible`, {
      serviceId,
      start,
      end
    });
  }

  getWorksHours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/worksHours`);
  }

}
