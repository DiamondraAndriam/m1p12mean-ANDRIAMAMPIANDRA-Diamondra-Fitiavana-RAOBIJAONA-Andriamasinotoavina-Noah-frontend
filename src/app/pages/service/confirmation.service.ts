import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private apiUrl = environment.apiUrl + '/users/confirmation-rdv';

  constructor(private http: HttpClient) {}

  envoyerConfirmation(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}