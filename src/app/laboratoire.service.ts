import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratoire } from './laboratoire';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private baseURL = environment.laboServiceUrl;
  constructor(private httpClient:HttpClient)  {

   }
   getLaboratoiresList():Observable<Laboratoire[]>{
    return this.httpClient.get<Laboratoire[]>(`${this.baseURL}`);
  }
    // Ajouter une nouvelle adresse
    createLaboratoire(formData: FormData): Observable<Laboratoire> {
      return this.httpClient.post<Laboratoire>(`${this.baseURL}`, formData);
    }
    
    updateLaboratoire(id: number, labo: Laboratoire, selectedLogo: File | null): Observable<Laboratoire> {
      const formData: FormData = new FormData();
    
      // Si dateActivation est une chaîne, la convertir en objet Date
      const dateActivation = new Date(labo.dateActivation);
    
      // Vérifier si la conversion a réussi
      if (!isNaN(dateActivation.getTime())) {
        formData.append('dateActivation', dateActivation.toISOString());  // Utiliser toISOString
      } else {
        // Si la conversion échoue, vous pouvez gérer l'erreur ou laisser le champ vide
        formData.append('dateActivation', labo.dateActivation);  // Si c'est déjà une chaîne valide
      }
    
      // Ajouter les autres champs à FormData
      formData.append('nom', labo.nom);
      formData.append('nrc', labo.nrc);
    
      // Si un logo est sélectionné, l'ajouter à FormData
      if (selectedLogo) {
        formData.append('logo', selectedLogo, selectedLogo.name);
      }
    
      // Log pour vérifier les données envoyées
      console.log('FormData:', formData);
    
      // Envoyer la requête HTTP PUT avec FormData
      return this.httpClient.put<Laboratoire>(`${this.baseURL}/${id}`, formData);
    }
    
    
    deleteLaboratoire(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
    }
    desactiverLaboratoire(id: number): Observable<void> {
      return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, {});
    }
    getLaboratoireById(id: number):Observable<Laboratoire>{
      return this.httpClient.get<Laboratoire>(`${this.baseURL}/${id}`);
    }


}
