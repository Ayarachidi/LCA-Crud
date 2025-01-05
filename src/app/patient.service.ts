import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Patient } from './patient';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
private baseURL = environment.PatientServiceUrl;
  constructor(private httpClient:HttpClient)  {

   }

  // Méthode pour ajouter un nouveau patient
  createPatient(patient: Patient): Observable<Patient> {
            return this.httpClient.post<Patient>(`${this.baseURL}/add`, patient);
  }
  // Méthode pour récupérer les patients actifs
  getActivePatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.baseURL}/active`);
  }
  // Méthode pour récupérer un patient par son ID
  getPatientById(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseURL}/get/${id}`);
  }

  // Méthode pour mettre à jour un patient
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.httpClient.put<Patient>(`${this.baseURL}/updatePatient/${id}`, patient);
  }

  // Méthode pour désactiver un patient
desactiverPatient(id: number): Observable<void> {
  return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, {});
}

}
