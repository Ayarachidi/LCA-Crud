import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Utilisation d'un chemin relatif avec le proxy
  private baseUrl = environment.userServiceUrl; 

  constructor(private http: HttpClient) {}

  desactiverUtilisateur(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/desactiver/${id}`, {});
  }

  // Récupérer les utilisateurs actifs
  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/active`);
  }

  createUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, formData);
  }

  updateUtilisateur(id: string, user: any, selectedSignature: File | null): Observable<any> {
    const formData: FormData = new FormData();

    // Ajouter les champs au FormData
    formData.append('nomComplet', user.nomComplet);
    formData.append('profession', user.profession);
    formData.append('numTel', user.numTel);
    formData.append('role', user.role);
    formData.append('motdepasse', user.motdepasse);
    formData.append('laboratoireId', user.laboratoireId?.toString() || '');

    // Ajouter le fichier de signature
    if (selectedSignature) {
      formData.append('signature', selectedSignature, selectedSignature.name);
    }

    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }
}
