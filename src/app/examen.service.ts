import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Examen } from './examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private baseURL = environment.ExamenServiceUrl;
  constructor(private httpClient:HttpClient)  {
  }


  addExamen(examen: Examen, id: string): Observable<Examen> {
    return this.httpClient.post<Examen>(`${this.baseURL}/add/${id}`, examen);
  }
  addExamenres(examen: Examen): Observable<Examen> {
    return this.httpClient.post<Examen>(`${this.baseURL}/add`, examen);
  }
  

  // Méthode pour récupérer les analyses actives
    getActiveExamens(): Observable<Examen[]> {
      return this.httpClient.get<Examen[]>(`${this.baseURL}/active`);
    }
     // Méthode pour récupérer un examen par son ID
              getExameById(id: number): Observable<Examen> {
                return this.httpClient.get<Examen>(`${this.baseURL}/get/${id}`);
              }
              // Désactiver un examen par ID
desactiverExamen(id: number): Observable<void> {
  return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, null);
}
getResultsByExamenId(id: number): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/${id}/results`);
}
 // Nouvelle méthode pour récupérer un examen par ID, date et fkNumDossier
getExamenByIdDateAndFkNumDossier(id: number, date: string, fkNumDossier: number): Observable<Examen> {
  return this.httpClient.get<Examen>(`${this.baseURL}/search?id=${id}&date=${date}&fkNumDossier=${fkNumDossier}`);
}

getResultsByExamenIdd(dossierId: number, examenId: number, date: string): Observable<{ [key: string]: number }> {
  const params = { id: examenId.toString(), fkNumDossier: dossierId.toString(), date };
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/search`, { params });
}
    
}
