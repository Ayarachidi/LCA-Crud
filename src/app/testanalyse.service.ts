import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Testanalyse } from './testanalyse';
@Injectable({
  providedIn: 'root'
})
export class TestanalyseService {
  private baseURL = environment.TestAnalyseServiceUrl;
  constructor(private httpClient:HttpClient)  {

   }
    // Méthode pour ajouter un nouveau test analyse
       createTestAnalyse(test: Testanalyse): Observable<Testanalyse> {
         return this.httpClient.post<Testanalyse>(`${this.baseURL}/addTestAnalyse`, test);
       }
       desactiverTestAnalyse(id: number): Observable<void> {
        return this.httpClient.put<void>(`${this.baseURL}/desactiver/${id}`, {});
      }
       // Méthode pour récupérer les testanalyses associés à une analyse  spécifique
        getTestAnalyseByAnalyseId(analyseId: number): Observable<Testanalyse[]> {
          return this.httpClient.get<Testanalyse[]>(`${this.baseURL}/${analyseId}`);
        }
         // Méthode pour récupérer un test par son ID
          getTestAnalyseById(id: number): Observable<Testanalyse> {
            return this.httpClient.get<Testanalyse>(`${this.baseURL}/get/${id}`);
          }

          updateTest(id: number, test: Testanalyse): Observable<Testanalyse> {
              return this.httpClient.put<Testanalyse>(`${this.baseURL}/updateTestAnalyse/${id}`, test);
          }

}
