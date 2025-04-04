import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private apiUrl = environment.apiUrl + '/rendezvous';

  constructor(private http: HttpClient) {}

  createRendezVous(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rendezvous`, appointmentData);
  }

}
