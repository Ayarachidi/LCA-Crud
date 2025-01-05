import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Analyse } from './analyse';

@Injectable({
  providedIn: 'root',
})
export class AnalyseService {
  private baseURL = environment.AnalyseServiceUrl;

  constructor(private httpClient: HttpClient) {}

  createAnalyse(analyse: Analyse, username: string): Observable<Analyse> {
    const formData = new FormData();
    formData.append('nom', analyse.nom);
    formData.append('description', analyse.description);
    formData.append('username', username);
  
    return this.httpClient.post<Analyse>(
      `${environment.AnalyseServiceUrl}/add`, 
      formData
    );
  }
  
  getAnalysesList(laboratoireId: number): Observable<Analyse[]> {
    return this.httpClient.get<Analyse[]>(`${this.baseURL}/active/${laboratoireId}`);
  }
     updateAnalyse(id: number, analyse: Analyse): Observable<Analyse> {
      console.log('Updating analyse with ID:', id, 'Data:', analyse);
      return this.httpClient.put<Analyse>(`${this.baseURL}/${id}`, analyse);
    }
    desactiverAnalyse(id: number): Observable<void> {
      return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, {});
    }
    deleteAnalyse(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
    }
    getAnalyseById(id: number): Observable<Analyse> {
      return this.httpClient.get<Analyse>(`${this.baseURL}/${id}`);
    }
    
  // Méthode pour récupérer les analyses actives
  getActiveAnalyses(): Observable<Analyse[]> {
    return this.httpClient.get<Analyse[]>(`${this.baseURL}/active`);
  }
  
  
  
}
