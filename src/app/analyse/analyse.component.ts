import { Component, OnInit } from '@angular/core';
import { KeycloakInitService } from '../keycloak-init.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Analyse } from '../analyse';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalyseService } from '../analyse.service';
import { EpreuveService } from '../epreuve.service';
import { Epreuve } from '../epreuve';
import { Testanalyse } from '../testanalyse';
import { TestanalyseService } from '../testanalyse.service';
import { UserService } from '../user.service';
import { User } from '../user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-analyse',
  standalone: true,
  providers:[AnalyseService,EpreuveService,TestanalyseService,UserService],
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css'],
})
export class AnalyseComponent implements OnInit {
  analyses: Analyse[] = [];
  username: string | undefined;
  isAddModalOpen = false; 
  currentStep = 1;
  isEditMode = false;
  newEpreuve: Epreuve = new Epreuve();
  newAnalyse: Analyse = new  Analyse();
  isModalOpen = false;
  isEditModalOpen=false;
  newTestAnalyse:Testanalyse= new Testanalyse();
  currentAnalyse:Analyse=new Analyse();
  isPopupVisible = false; 
  isPopupVisibleTest=false;
  usercon: User | undefined;  // Déclarez la propriété user pour stocker les informations utilisateur
  laboratoireId: number | undefined;  // Déclarez laboratoireId pour stocker l'id du laboratoire de l'utilisateur
  constructor(
    private router: Router ,// Inject Router here
    private keycloakInitService: KeycloakInitService,
    private cdr: ChangeDetectorRef,
    private analyseService: AnalyseService ,
    private epreuveService:EpreuveService,
    private testanalyseservice:TestanalyseService,
    private userservice:UserService
  ) {}

  ngOnInit(): void {
    this.keycloakInitService.username$.subscribe((username) => {
      this.username = username;
      this.getAnalyses();
      console.log('Valeur du username reçue dans le composant :', this.username);
      this.cdr.detectChanges(); // Forcer la détection des changements si nécessaire
    });
  }

  
openAddModal() {
    this.isAddModalOpen = true;
    this.currentStep = 1;
    this.newAnalyse = new Analyse();
  }
 // Fermeture du modal d'ajout
 closeAddModal() {
  if (this.newAnalyse.id) {
    this.analyseService.deleteAnalyse(this.newAnalyse.id).subscribe({
      next: () => {
        console.log('Analyse deleted successfully');
        this.isAddModalOpen = false;
        this.resetForm();
        this.isPopupVisible = false; 
        this.isPopupVisibleTest = false;
        this.getAnalyses();
      },
      error: (err) => {
        console.error('Error deleting analyse:', err);
      },
    });
  } else {
    console.error('No ID found for the analyse to delete');
  }
}


  resetForm() {
    this.newAnalyse = new Analyse();
    this.newEpreuve = new Epreuve();


   
  }

   // Navigation entre les étapes du formulaire
   goToNextStep() {
    switch (this.currentStep) {
      case 1:
        this.saveAnalyse();
        break;
      case 2:
        this.saveEpreuve();
        break;
        case 3:
          this.saveTestAnalyse();
          break;  
     
      default:
        break;
    }
  }
  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  saveAnalyse() {
    const username = this.username;
  
    if (username) {
      this.analyseService.createAnalyse(this.newAnalyse, username).subscribe({
        next: (response) => {
          console.log('Analyse ajoutée avec succès :', response);
          this.newAnalyse = response; // Mettre à jour l'objet analyse avec la réponse (incluant l'ID généré)
          this.currentStep = 2; // Passer à l'étape suivante (création de l'épreuve)
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'analyse :', error);
        },
      });
    } else {
      console.error('Username is undefined');
    }
  }
  
  
  saveEpreuve(){
    console.log("Epreuve à envoyer:", this.newEpreuve); // Vérifiez le contenu de l'objet avant l'envoi
    this.newEpreuve.analyse = this.newAnalyse;  // Associer le labo au contact
    this.epreuveService.createEpreuve(this.newEpreuve).subscribe(
      (epreuve) => {
        console.log('Epreuve  sauvegardé:', epreuve);
        this.newEpreuve = epreuve;
        this.isPopupVisible = true; // Passer à l'étape Adresse
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde epreuve:', error);
      }
    );
  }
// Contrôle l'affichage du popup
  closePopup() {
    this.isPopupVisible = false;
    this.getAnalyses();
  }
  addAnotherEpreuve() {
      // Réinitialise les objets de formulaire pour le contact et l'adresse
      this.newEpreuve = new Epreuve();
 
      // Associe le même laboratoire au nouveau contact
      this.newEpreuve.analyse = this.newAnalyse;
      this.isPopupVisible = false;
      // Passe à l'étape 2 (formulaire de contact)
      this.currentStep = 2;
 
      
    }
   

  saveTestAnalyse(){
    console.log("Test analyse à envoyer:", this.newTestAnalyse); // Vérifiez le contenu de l'objet avant l'envoi
    this.newTestAnalyse.analyse = this.newAnalyse;  // Associer le labo au contact
    this.testanalyseservice.createTestAnalyse( this.newTestAnalyse).subscribe(
      (test) => {
        console.log('TestAnalyse  sauvegardé:', test);
        this.newTestAnalyse= test;
        this.isPopupVisibleTest = true; 
       
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde test analyse:', error);
      }
    );
  }
  addTestAnalyse(){
    this.newTestAnalyse = new Testanalyse();
    this.isPopupVisibleTest=false;
    this.isPopupVisible=false;
    this.currentStep = 3;
   
  }
  getAnalyses() {
    // Vérifiez si username est défini avant de faire la requête
    if (this.username) {
      this.userservice.getUtilisateur(this.username).subscribe(
        (user: User) => {
          this.usercon = user;  // Stocker l'utilisateur dans la variable
          this.laboratoireId = user.laboratoireId;  // Récupérer le laboratoireId
          console.log('Laboratoire ID:', this.laboratoireId);  // Afficher l'id du laboratoire dans la console
          
          // Une fois que vous avez le laboratoireId, récupérer la liste des analyses
          this.getAnalysesList(this.laboratoireId);  // Appeler la méthode pour récupérer les analyses
        },
        error => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
      );
    } else {
      console.error('Le username n\'est pas défini, impossible de récupérer l\'utilisateur.');
    }
  }
  
  private getAnalysesList(laboratoireId: number): void {
    this.analyseService.getAnalysesList(laboratoireId).subscribe(
      (data) => {
        // Stocker les analyses dans la propriété data
        this.analyses = data;
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des analyses:', error);
      }
    );
  }


  openEditModal(analyse:Analyse){
    this.isEditModalOpen = true;
      this.currentAnalyse = { ...analyse }; // Clone pour éviter les références

  }
 
  
    // Fermeture du modal de modification
    closeEditModal() {
      this.isEditModalOpen = false;
      this.currentAnalyse = new Analyse();
    }
    updateAnalyse(){
      const analyse:Analyse=this.currentAnalyse;
      this.analyseService.updateAnalyse(this.currentAnalyse.id, analyse).subscribe(response => {
        // Gérer la réponse (fermer le modal, mettre à jour la liste, etc.)
        this.closeEditModal();
        this.getAnalyses(); // Rafraîchir la liste des laboratoires
      });
     
    }
 

    desactiverAnalyse(analyseId: number) {
      // Récupérer les épreuves liées à l'analyse
      this.epreuveService.getEpreuveByAnalyseId(analyseId).subscribe(
        (epreuves) => {
          // Désactiver chaque épreuve associée
          epreuves.forEach((epreuve) => {
            this.epreuveService.desactiverEpreuve(epreuve.id).subscribe(
              () => console.log(`Épreuve avec ID ${epreuve.id} désactivée avec succès.`),
              (error) => console.error(`Erreur lors de la désactivation de l'épreuve avec ID ${epreuve.id}:`, error)
            );
          });
    
          // Récupérer les tests liés à l'analyse
          this.testanalyseservice.getTestAnalyseByAnalyseId(analyseId).subscribe(
            (tests) => {
              // Désactiver chaque test associé
              tests.forEach((test) => {
                this.testanalyseservice.desactiverTestAnalyse(test.id).subscribe(
                  () => console.log(`Test analyse avec ID ${test.id} désactivé avec succès.`),
                  (error) => console.error(`Erreur lors de la désactivation du test analyse avec ID ${test.id}:`, error)
                );
              });
    
              // Après désactivation des dépendances, désactiver l'analyse
              this.analyseService.desactiverAnalyse(analyseId).subscribe(
                () => {
                  console.log(`Analyse avec ID ${analyseId} désactivée avec succès.`);
                  this.getAnalyses(); // Actualiser la liste des analyses
                },
                (error) => {
                  console.error(`Erreur lors de la désactivation de l'analyse avec ID ${analyseId}:`, error);
                }
              );
            },
            (error) => {
              console.error(`Erreur lors de la récupération des tests pour l'analyse avec ID ${analyseId}:`, error);
            }
          );
        },
        (error) => {
          console.error(`Erreur lors de la récupération des épreuves pour l'analyse avec ID ${analyseId}:`, error);
        }
      );
    }
    confirmerDesactivation(analyseId: number) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Cette action désactivera l'analyse et toutes ses dépendances !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, Supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.desactiverAnalyse(analyseId);
          Swal.fire(
            'Désactivée !',
            'L\'analyse a été désactivée avec succès.',
            'success'
          );
        }
      });
    }

    navigateToCrudEpreuve(analyseId: number) {
      
      this.router.navigate(['crud-epreuve', analyseId]);
  
    }

    navigateToCrudTestAnalyse(analyseId: number) {
      
      this.router.navigate(['crud-testanalyse', analyseId]);
  
    }
   
        
    
}  

