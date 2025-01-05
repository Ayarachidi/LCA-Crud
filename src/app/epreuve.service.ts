import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Epreuve } from './epreuve';
@Injectable({
  providedIn: 'root'
})
export class EpreuveService {

  private baseURL = environment.EpreuveServiceUrl;
  constructor(private httpClient:HttpClient)  {
  }
  // Méthode pour ajouter un nouveau Epreuve
    createEpreuve(epreuve: Epreuve): Observable<Epreuve> {
      return this.httpClient.post<Epreuve>(`${this.baseURL}/addEpreuve`, epreuve);
    }
    desactiverEpreuve(id: number): Observable<void> {
      return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, {});
    }
     // Méthode pour récupérer les epreuves associés à une analyse  spécifique
    getEpreuveByAnalyseId(analyseId: number): Observable<Epreuve[]> {
          return this.httpClient.get<Epreuve[]>(`${this.baseURL}/${analyseId}`);
    }
    // Méthode pour récupérer un Epreuve par son ID
  getEpreuveById(id: number): Observable<Epreuve> {
    return this.httpClient.get<Epreuve>(`${this.baseURL}/get/${id}`);
  }
  updateEpreuve(id: number, epreuve: Epreuve): Observable<Epreuve> {
    return this.httpClient.put<Epreuve>(`${this.baseURL}/updateEpreuve/${id}`, epreuve);
}


}
