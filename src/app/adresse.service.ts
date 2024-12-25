import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse } from './adresse';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private baseURL=environment.adresseServiceUrl;
  constructor(private httpClient:HttpClient)  {

   }
   getAdressesList():Observable<Adresse[]>{
     return this.httpClient.get<Adresse[]>(`${this.baseURL}`);
   }
    // Ajouter une nouvelle adresse
  createAdresse(adresse: Adresse): Observable<Adresse> {
    return this.httpClient.post<Adresse>(`${this.baseURL}`, adresse);
  }

  updateAdresse(id: number, adresse: Adresse): Observable<Adresse> {
    console.log('Updating address with ID:', id, 'Data:', adresse);
    return this.httpClient.put<Adresse>(`${this.baseURL}/${id}`, adresse);
  }
  
  deleteAdresse(id: number): Observable<void> {
    return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, null);  // Utilisez PUT pour la suppression logique
  }
  deleteAdresses(adresseIds: number[]): Observable<void> {
    return this.httpClient.post<void>(`${this.baseURL}/delete`, { ids: adresseIds });
  }
  getAdresseIdsByLaboratoireId(laboratoireId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseURL}/laboratoire/${laboratoireId}`);
  }
  
  

  
}
 



  
  

