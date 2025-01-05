import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Epreuve } from '../epreuve';
import { EpreuveService } from '../epreuve.service';
import { AnalyseService } from '../analyse.service';
@Component({
  selector: 'app-crud-epreuve',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule], 
  templateUrl: './crud-epreuve.component.html',
  styleUrl: './crud-epreuve.component.css',
  providers: [EpreuveService,AnalyseService]
})
export class CrudEpreuveComponent {
     analyseId!: number; // ID du analyse
     epreuves: Epreuve[] = []; // Liste des epreuves
     isAddEpreuveModalOpen = false;
     isEditEpreuveModalOpen=false;
     newEpreuve:Epreuve=new Epreuve();
    currentEpreuve: Epreuve = new Epreuve();
   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private epreuveservice:EpreuveService,
      private analyseservice:AnalyseService,
    ) {}


    ngOnInit(): void {
      this.analyseId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.analyseId) {
        this.loadEpreuves(this.analyseId);
      } else {
        console.error('ID analyse invalide');
      }
    }
  
    loadEpreuves(analyseId: number): void {
      this.epreuveservice.getEpreuveByAnalyseId(analyseId).subscribe(
        (data) => {
          this.epreuves = data;
          console.log('Epreuves récupérés avec succès :', this.epreuves);
        },
        (error) => {
          console.error('Erreur lors de la récupération des epreuves :', error);
        }
      );
    }

     openModal(): void {
        this.isAddEpreuveModalOpen = true; // Ouvre le modal
      
        this.newEpreuve = new Epreuve();  // Réinitialise le contact
       
      }
      closeModal(): void {
   
        this.isAddEpreuveModalOpen = false;  // Ferme le modal
        this.loadEpreuves(this.analyseId);
      }

      saveEpreuve() {
        // Récupérer l'analyse par son ID
        this.analyseservice.getAnalyseById(this.analyseId).subscribe(
          (analyse) => {
            // Assigner l'analyse récupérée à la nouvelle épreuve
            this.newEpreuve.analyse = analyse;
      
            // Envoyer l'épreuve avec l'analyse au backend
            this.epreuveservice.createEpreuve(this.newEpreuve).subscribe(
              (epreuve) => {
                console.log('Épreuve sauvegardée:', epreuve);
                this.newEpreuve = epreuve;
                this.closeModal();
              },
              (error) => {
                console.error('Erreur lors de la sauvegarde de l\'épreuve:', error);
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'analyse:', error);
          }
        );
      }

      editEpreuve(epreuveId : number){
        this.epreuveservice.getEpreuveById(epreuveId).subscribe(
          (data) => {
            this.currentEpreuve = data;
            this.isEditEpreuveModalOpen = true; 
          },
          (error) => {
            console.error('Erreur lors de la récupération epreuve :', error);
          }
        );

      }

      closeEditModal(): void {
        this.isEditEpreuveModalOpen = false; // Ferme le modal
        this.loadEpreuves(this.analyseId);
      }
      updateEpreuve(){
        const epreuve:Epreuve=this.currentEpreuve;
        this.epreuveservice.updateEpreuve(this.currentEpreuve.id, epreuve).subscribe(response => {
          // Gérer la réponse (fermer le modal, mettre à jour la liste, etc.)
          this.closeEditModal();
         // Rafraîchir la liste des laboratoires
        });

      }

      desactiverEpreuve(epreuveId: number) {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Cette action désactivera l'épreuve sélectionnée !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.epreuveservice.desactiverEpreuve(epreuveId).subscribe(
              () => {
                console.log(`Épreuve avec ID ${epreuveId} supprimée avec succès.`);
                Swal.fire(
                  'Désactivée !',
                  "L'épreuve a été supprimée avec succès.",
                  'success'
                );
                this.loadEpreuves(this.analyseId);// Rechargez la liste des épreuves
              },
              (error) => {
                console.error(`Erreur lors de la désactivation de l'épreuve avec ID ${epreuveId}:`, error);
                Swal.fire(
                  'Erreur',
                  "Une erreur est survenue lors de la désactivation de l'épreuve.",
                  'error'
                );
              }
            );
          }
        });
      }
      
      confirmerDesactivationEpreuve(epreuveId: number) {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Cette action supprimer définitivement l'épreuve sélectionnée !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.desactiverEpreuve(epreuveId);
            this.loadEpreuves(this.analyseId);
          }
        });
      }
      
     
      
}
