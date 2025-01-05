import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Dossier } from './dossier';
@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private baseURL = environment.DossierServiceUrl;
  constructor(private httpClient:HttpClient)  {

   }
       // Méthode pour ajouter un nouveau dossier
       createDossier(dossier: Dossier): Observable<any> {
        return this.httpClient.post(`${this.baseURL}/addDossier`, dossier, { responseType: 'text' });
      }
      
       // Nouvelle méthode pour récupérer les dossiers par patientId
  getDossierByPatientId(patientId: number): Observable<Dossier> {
    return this.httpClient.get<Dossier>(`${this.baseURL}/patient/${patientId}`);
  }
}
