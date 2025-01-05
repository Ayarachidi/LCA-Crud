import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Testanalyse } from '../testanalyse';
import { TestanalyseService } from '../testanalyse.service';
import { AnalyseService } from '../analyse.service';
@Component({
  selector: 'app-crud-test-analyse',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './crud-test-analyse.component.html',
  styleUrl: './crud-test-analyse.component.css',
    providers: [TestanalyseService,AnalyseService]
})
export class CrudTestAnalyseComponent {
     analyseId!: number; // ID du analyse
     tests: Testanalyse[] = []; // Liste des epreuves
     isAddTestAnalyseModalOpen = false;
     isEditTestAnalyseModalOpen=false;
     newTestAnalyse:Testanalyse=new Testanalyse();
     currentTestAnalyse: Testanalyse = new Testanalyse();
   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private testservice:TestanalyseService,
      private analyseservice:AnalyseService,
    ) {}


    ngOnInit(): void {
      this.analyseId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.analyseId) {
        this.loadTests(this.analyseId);
      } else {
        console.error('ID analyse invalide');
      }
    }
  
    loadTests(analyseId: number): void {
      this.testservice.getTestAnalyseByAnalyseId(analyseId).subscribe(
        (data) => {
          this.tests = data;
          console.log('Tests récupérés avec succès :', this.tests);
        },
        (error) => {
          console.error('Erreur lors de la récupération des Tests :', error);
        }
      );
    }

     openModal(): void {
        this.isAddTestAnalyseModalOpen = true; // Ouvre le modal
      
        this.newTestAnalyse = new Testanalyse();  // Réinitialise le contact
       
      }
      closeModal(): void {
   
        this.isAddTestAnalyseModalOpen = false;  // Ferme le modal
        this.loadTests(this.analyseId);
      }

      saveTest() {
        // Récupérer l'analyse par son ID
        this.analyseservice.getAnalyseById(this.analyseId).subscribe(
          (analyse) => {
            // Assigner l'analyse récupérée à la nouvelle épreuve
            this.newTestAnalyse.analyse = analyse;
      
            // Envoyer l'épreuve avec l'analyse au backend
            this.testservice.createTestAnalyse(this.newTestAnalyse).subscribe(
              (test) => {
                console.log('Test sauvegardée:', test);
                this.newTestAnalyse = test;
                this.closeModal();
              },
              (error) => {
                console.error('Erreur lors de la sauvegarde de test:', error);
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'analyse:', error);
          }
        );
      }

      editTest(testId : number){
        this.testservice.getTestAnalyseById(testId).subscribe(
          (data) => {
            this.currentTestAnalyse = data;
            this.isEditTestAnalyseModalOpen = true; 
          },
          (error) => {
            console.error('Erreur lors de la récupération epreuve :', error);
          }
        );

      }

      closeEditModal(): void {
        this.isEditTestAnalyseModalOpen = false; // Ferme le modal
        this.loadTests(this.analyseId);
      }
      updateTest(){
        const test:Testanalyse=this.currentTestAnalyse;
        this.testservice.updateTest(this.currentTestAnalyse.id, test).subscribe(response => {
          // Gérer la réponse (fermer le modal, mettre à jour la liste, etc.)
          this.closeEditModal();
         // Rafraîchir la liste des laboratoires
        });

      }

      desactiverTestAnalyse(testId: number) {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Cette action supprimera Test analyse  sélectionnée !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.testservice.desactiverTestAnalyse(testId).subscribe(
              () => {
                console.log(`Test analyse avec ID ${testId} supprimé avec succès.`);
                Swal.fire(
                  'Supprimé !',
                  "Test analyse a été supprimé avec succès.",
                  'success'
                );
                this.loadTests(this.analyseId);// Rechargez la liste des Tests
              },
              (error) => {
                console.error(`Erreur lors de la désactivation de Test avec ID ${testId}:`, error);
                Swal.fire(
                  'Erreur',
                  "Une erreur est survenue lors de la désactivation de Test.",
                  'error'
                );
              }
            );
          }
        });
      }
      
      confirmerDesactivationTestAnalyse(testId: number) {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Cette action supprimer définitivement Test analyse sélectionnée !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.desactiverTestAnalyse(testId);
            this.loadTests(this.analyseId);
          }
        });
      }
      
     
      
}
