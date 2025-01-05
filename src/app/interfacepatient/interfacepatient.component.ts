import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Importez RouterModule ici pour gérer le routage
import Swal from 'sweetalert2';
import { ExamenService } from '../examen.service';
import { TestanalyseService } from '../testanalyse.service';
import { Examen } from '../examen';
import { Testanalyse } from '../testanalyse';
@Component({
  selector: 'app-interfacepatient',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    FormsModule, 
    RouterModule  // Ajoutez RouterModule ici pour le routage dans un composant autonome
  ],
  providers:[TestanalyseService,ExamenService],
  templateUrl: './interfacepatient.component.html',
  styleUrls: ['./interfacepatient.component.css']  // Correction de styleUrls ici
})
export class InterfacepatientComponent {



  currentExamen: Examen = new Examen();
   
   examens: Examen[] = [];
   testAnalyses: Testanalyse[] = [];
   resultats: { [key: string]: number } = {}; 
   numDossier: string = '';
  numExamen: string = '';
  dateExamen: string = '';
   constructor(
        private router: Router,
        private route: ActivatedRoute,
        private examenservice:ExamenService,
       
            private testanalyseService: TestanalyseService,
      ) {}
      onSubmit() {
        const date = new Date(this.dateExamen).toISOString();
        const dossierId = parseInt(this.numDossier);
        const examenId = parseInt(this.numExamen);
    
        this.examenservice
          .getResultsByExamenIdd(dossierId, examenId, date)
          .subscribe({
            next: (results) => {
              Swal.fire({
                title: 'Résultats de l’examen',
                html: this.generateTableHTML(results),
                icon: 'info',
                width: '600px'
              });
            },
            error: () => {
              Swal.fire({
                title: 'Erreur',
                text: 'Aucun examen trouvé pour les informations fournies.',
                icon: 'error'
              });
            }
          });
      }
    
      private generateTableHTML(results: { [key: string]: number }): string {
        let tableHTML = '<table class="table table-striped"><thead><tr><th>Test</th><th>Résultat</th></tr></thead><tbody>';
        for (const [key, value] of Object.entries(results)) {
          tableHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        tableHTML += '</tbody></table>';
        return tableHTML;
      }
    }


  

