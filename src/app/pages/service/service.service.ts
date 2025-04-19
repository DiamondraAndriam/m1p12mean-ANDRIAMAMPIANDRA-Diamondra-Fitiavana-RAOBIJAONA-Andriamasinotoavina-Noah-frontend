import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Service {
    id?: string,
    nom?: string,
    description?: string,
    prix?: number,
    temps_estime?: number,
    status?: string,
    typeMecanicien?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl; 

  constructor(private http : HttpClient) { }

  newService(service: Service): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, service);
  }
}
