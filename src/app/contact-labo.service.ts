import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactLabo } from './contact-labo';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactLaboService {
  private baseURL = environment.contactServiceUrl;  // L'URL de base pour les contacts

  constructor(private httpClient: HttpClient) {}

  // Méthode pour récupérer tous les contacts de laboratoire
  getContactLaboratoiresList(): Observable<ContactLabo[]> {
    return this.httpClient.get<ContactLabo[]>(`${this.baseURL}`);
  }

  // Méthode pour ajouter un nouveau contact laboratoire
  createContactLaboratoire(clabo: ContactLabo): Observable<ContactLabo> {
    return this.httpClient.post<ContactLabo>(`${this.baseURL}`, clabo);
  }

  // Méthode pour mettre à jour un contact laboratoire
  updateContactLaboratoire(id: number, clabo: ContactLabo): Observable<ContactLabo> {
    console.log('Updating laboratoire with ID:', id, 'Data:', clabo);
    return this.httpClient.put<ContactLabo>(`${this.baseURL}/${id}`, clabo);
  }

  // Méthode pour supprimer un contact laboratoire
  deleteContactLaboratoire(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  // Méthode pour récupérer les contacts associés à un laboratoire spécifique
  getContactsByLaboratoireId(laboratoireId: number): Observable<ContactLabo[]> {
    return this.httpClient.get<ContactLabo[]>(`${this.baseURL}/${laboratoireId}`);
  }

  // Méthode pour supprimer plusieurs contacts par IDs
  deleteContact(contactId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.baseURL}/delete`, contactId);
  }
  getAdresseByContactId(contactId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/adresse/${contactId}`);
  }
  getContactById(id: number): Observable<ContactLabo> {
    return this.httpClient.get<ContactLabo>(`${this.baseURL}/contact/${id}`);
  }

  
}
