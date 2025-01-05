import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Dossier } from '../dossier';
import { DossierService } from '../dossier.service';
import { Examen } from '../examen';
import { Analyse } from '../analyse';
import { AnalyseService } from '../analyse.service';
import { ExamenService } from '../examen.service';
import { Testanalyse } from '../testanalyse';
import { TestanalyseService } from '../testanalyse.service';
@Component({
  selector: 'app-crud-dossier',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [DossierService,AnalyseService,ExamenService],
  templateUrl: './crud-dossier.component.html',
  styleUrls: ['./crud-dossier.component.css']
})
export class CrudDossierComponent implements OnInit {
  patientId!: number; // ID du patient
  dossier: Dossier = new Dossier();  // Initialisez l'objet dossier
 isAddExamenModalOpen = false;
 email: string = '';
 
 isEditExamenModalOpen = false;
 isResExamenModalOpen=false;
 isaffichageResExamenModalOpen=false;
  newExamen: Examen = new Examen();
  currentExamen: Examen = new Examen();
   analyses: Analyse[] = []; 
   examens: Examen[] = [];
   testAnalyses: Testanalyse[] = [];
   resultats: { [key: string]: number } = {}; // Stockage des résultats saisis
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dossierservice: DossierService,
    private analyseservice: AnalyseService,
    private examenservice:ExamenService,
    private cd: ChangeDetectorRef,
    private testanalyseService: TestanalyseService,

  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du patient à partir des paramètres de l'URL
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    // Appeler la méthode pour récupérer les données du dossier
    this.getDossierByPatientId();
    this.getAnalyses();
    this.loadExamens();
  }

  loadExamens(): void {
    this.examenservice.getActiveExamens().subscribe(
      (data) => {
        console.log('Examens récupérés avec succès :', data);
        this.examens = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Examens :', error);
        console.error('Details:', error.message, error.status, error.error);
      }
    );
  }
  
  // Méthode pour récupérer le dossier du patient par son ID
  getDossierByPatientId(): void {
    this.dossierservice.getDossierByPatientId(this.patientId).subscribe(
      (data) => {
        console.log('Dossier récupéré:', data);  // Afficher la réponse de l'API
        this.dossier = data;  // Assigner les données récupérées à l'objet 'dossier'
      },
      (error) => {
        console.error('Erreur lors de la récupération du dossier:', error);
        Swal.fire('Erreur', 'Impossible de récupérer le dossier.', 'error');
      }
    );
  }
  openAddExamenModal(){
    
        this.isAddExamenModalOpen = true;
  }
  getAnalyses() {
    this.analyseservice.getActiveAnalyses().subscribe(
      (data) => (this.analyses = data),
      (error) => console.error('Erreur lors de la récupération des analyses:', error)
    );
    
  }

// Appelé lors de la sélection dans le menu déroulant
onAnalyseChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedAnalyseName = selectElement.value;

  if (!selectedAnalyseName) {
    console.log('Aucun analyse sélectionné');
    return;
  }

  const selectedAnalyse = this.analyses.find((analyse) => analyse.nom === selectedAnalyseName);
  if (selectedAnalyse) {
    console.log('Analyse sélectionnée :', selectedAnalyse);
    this.newExamen.analyse = selectedAnalyse; // Assurez-vous que vous modifiez `newExamen` si utilisé dans `AddExamen`
  } else {
    console.error('Analyse non trouvée');
  }
}


  
  // Close modal
  closeAddUserModal() {
    this.isAddExamenModalOpen = false;
    this.loadExamens();
    this.isEditExamenModalOpen = false;
  }

  
  AddExamen() {

    if (!this.newExamen.date) {
      this.newExamen.date = new Date().toISOString(); // Chaîne ISO 8601
    }
    
    
    this.newExamen.fkNumDossier=this.dossier.numDossier;
    
    this.email = this.dossier.patient?.email ?? '';
    // Appel au service pour ajouter l'examen
    this.examenservice.addExamen(this.newExamen,this.email).subscribe(
      (response) => {
        this.closeAddUserModal();
        console.log('Examen ajouté avec succès:', response);
        // Ajouter une notification ou effectuer une redirection si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'examen:', error);
      }
    );
  }
  editExamen(examId: number) {
    this.examenservice.getExameById(examId).subscribe(
      (data) => {
        console.log('Examen récupéré :', data);
        this.currentExamen = data; // Assurez-vous que data.analyse est un objet
        this.cd.detectChanges();  // Forcer la détection des changements
        this.isEditExamenModalOpen = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'épreuve :', error);
      }
    );
  }

  desactiverExamen(examId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera l'examen sélectionné !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenservice.desactiverExamen(examId).subscribe(
          () => {
            console.log(`Examen avec ID ${examId} supprimer avec succès.`);
            Swal.fire(
              'Désactivé !',
              "L'examen a été supprimé avec succès.",
              'success'
            );
            this.loadExamens(); // Rechargez la liste des examens après la désactivation
          },
          (error) => {
            console.error(`Erreur lors de la suppression de l'examen avec ID ${examId}:`, error);
            Swal.fire(
              'Erreur',
              "Une erreur est survenue lors de la suppression de l'examen.",
              'error'
            );
          }
        );
      }
    });
  }
  
  confirmerDesactivationExamen(examId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement l'examen sélectionné !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactiverExamen(examId);
        this.loadExamens(); // Rechargez la liste des examens après confirmation
      }
    });
  }
  openAddResultModal(examen: Examen): void {
    this.currentExamen = examen; // Stocker l'examen sélectionné
    this.isResExamenModalOpen = true;


    // Charger les tests associés
    this.testanalyseService.getTestAnalyseByAnalyseId(examen.analyse.id).subscribe(
        (tests) => {
            this.testAnalyses = tests;

            // Charger les résultats existants pour l'examen
            this.examenservice.getResultsByExamenId(examen.id).subscribe(
                (results) => {
                    this.resultats = {};
                    this.testAnalyses.forEach((test) => {
                        // Assurez-vous que chaque test a une valeur initialisée
                        this.resultats[test.nomTest] = results[test.nomTest] ?? null; // Utilisez null au lieu de 0 si nécessaire
                    });
                    this.cd.detectChanges(); // Forcer la détection des changements
                },
                (error) => {
                    console.error('Erreur lors de la récupération des résultats :', error);
                }
            );
        },
        (error) => {
            console.error('Erreur lors de la récupération des tests :', error);
        }
    );
}

openAddResultModal1(examen: Examen): void {
  this.currentExamen = examen; // Stocker l'examen sélectionné
  
  this.isaffichageResExamenModalOpen=true;

  // Charger les tests associés
  this.testanalyseService.getTestAnalyseByAnalyseId(examen.analyse.id).subscribe(
      (tests) => {
          this.testAnalyses = tests;

          // Charger les résultats existants pour l'examen
          this.examenservice.getResultsByExamenId(examen.id).subscribe(
              (results) => {
                  this.resultats = {};
                  this.testAnalyses.forEach((test) => {
                      // Assurez-vous que chaque test a une valeur initialisée
                      this.resultats[test.nomTest] = results[test.nomTest] ?? null; // Utilisez null au lieu de 0 si nécessaire
                  });
                  this.cd.detectChanges(); // Forcer la détection des changements
              },
              (error) => {
                  console.error('Erreur lors de la récupération des résultats :', error);
              }
          );
      },
      (error) => {
          console.error('Erreur lors de la récupération des tests :', error);
      }
  );
}



  closeModal(): void {
    const modal = document.getElementById('addResultModal');
    if (modal) modal.style.display = 'none';
    this.isResExamenModalOpen=false;
    this.isaffichageResExamenModalOpen=false;
    this.loadExamens();
  }

  saveResults(): void {
    // Ajouter les résultats à l'examen
    this.currentExamen.resultat = { ...this.resultats };
    this.examenservice.addExamenres(this.currentExamen).subscribe(
      (response) => {
        console.log('Résultats ajoutés avec succès :', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement des résultats :', error);
      }
    );
  }
  
  
 
}
