import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LaboratoireService } from '../laboratoire.service';
import { Laboratoire } from '../laboratoire';
import { ContactLaboService } from '../contact-labo.service';
import { ContactLabo } from '../contact-labo';
import { Adresse } from '../adresse';
import { AdresseService } from '../adresse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-laboratoires',
  standalone: true,
  providers: [LaboratoireService, ContactLaboService, AdresseService,KeycloakService],
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './laboratoires.component.html',
  styleUrls: ['./laboratoires.component.css'],

})
export class LaboratoiresComponent implements OnInit {
  userRoles: string[] = [];
  laboratoires: Laboratoire[] = [];
  isModalOpen = false;
  isEditMode = false;
  isAddModalOpen = false; // Gestion du modal d'ajout
  isEditModalOpen = false; // Gestion du modal d'édition
  currentStep = 1; // Étape actuelle du formulaire
  currentLaboratoire: Laboratoire = new Laboratoire(); // Laboratoire en cours d'édition ou d'ajout
  x: boolean = true;
  // Objets pour le formulaire
  newLaboratoire: Laboratoire = new Laboratoire();
  newContact: ContactLabo = new ContactLabo();
  newAdresse: Adresse = new Adresse();

  constructor(
    private router: Router ,// Inject Router here
    private laboratoireService: LaboratoireService,
    private adresseService: AdresseService,
    private contactLaboService: ContactLaboService,
    private KeycloakService : KeycloakService
  ) {}

  ngOnInit(): void {
    console.log('LaboratoiresComponent loaded');
    this.getLaboratoires(); 
    this.loadUserRoles();// Récupère la liste des laboratoires au démarrage
  }
  private async loadUserRoles(): Promise<void> {
    // Utilisez 'await' pour attendre la résolution de la promesse isLoggedIn()
    const isLoggedIn = await this.KeycloakService.isLoggedIn();
    if (isLoggedIn) {
      const userRoles = this.KeycloakService.getUserRoles();
      this.userRoles = userRoles; // Stocke les rôles récupérés
      console.log('Rôles utilisateur :', this.userRoles);
    }
  }
  

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  // Récupération de la liste des laboratoires
  private getLaboratoires() {
    this.laboratoireService.getLaboratoiresList().subscribe(
      (data) => {
        this.laboratoires = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des laboratoires:', error);
      }
    );
  }

  openAddModal() {
    this.isAddModalOpen = true;
    this.currentStep = 1;
    this.newLaboratoire = new Laboratoire();
  }

  // Fermeture du modal d'ajout
  closeAddModal() {
    this.isAddModalOpen = false;
    this.resetForm();
  }

  // Ouverture de la modale pour ajouter ou éditer un laboratoire
  openModal(laboratoire: Laboratoire | null = null) {
    this.currentStep = 1; // Réinitialise à l'étape 1
    this.isModalOpen = true;

    if (laboratoire) {
      this.isEditMode = true;
      this.currentLaboratoire = { ...laboratoire }; // Clone le laboratoire pour éviter les références directes
    } else {
      this.isEditMode = false;
      this.currentLaboratoire = new Laboratoire();
    }
  }


  // Fermeture de la modale
  closeModal() {
    this.isModalOpen = false;
    this.resetForm(); // Réinitialise les objets de formulaire
  }

  resetForm() {
    this.newLaboratoire = new Laboratoire();
    this.newContact = new ContactLabo();
    this.newAdresse = new Adresse();
  
    if (this.isEditMode && this.currentLaboratoire.id) {
      this.newLaboratoire = { ...this.currentLaboratoire }; // Récupère le laboratoire en mode édition
    }
  }
  

  // Navigation entre les étapes du formulaire
  goToNextStep() {
    switch (this.currentStep) {
      case 1:
         this.saveLaboratoire();
        break;
      case 2:
        this.saveContact();
        break;
      case 3:
        this.saveAdresse();
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
  

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;  // Mettez à jour le logo sélectionné
    }
  }
  
saveLaboratoire() {
  if (!this.newLaboratoire.nom) {
    console.error('Le champ nom est obligatoire.');
    return;
  }

  const formData = new FormData();

  formData.append('nom', this.newLaboratoire.nom); // Assurez-vous que cette ligne est bien présente
  formData.append('nrc', this.newLaboratoire.nrc);
  if (this.newLaboratoire.dateActivation) {
    formData.append('dateActivation', this.newLaboratoire.dateActivation); // Convertir en ISO string
  }
  if (this.selectedFile) {
    formData.append('logo', this.selectedFile);
  }

  this.laboratoireService.createLaboratoire(formData).subscribe(
    (labo) => {
      console.log('Laboratoire sauvegardé avec succès:', labo);
      this.newLaboratoire = labo;
      this.currentStep = 2;
    },
    (error) => {
      console.error('Erreur lors de la sauvegarde du laboratoire:', error);
      if (error.error && error.error.message) {
        console.error('Détails de l\'erreur :', error.error.message);
      }
    }
  );
}



  

  // Mise à jour d'un laboratoire existant
  

  openEditModal(laboratoire: Laboratoire) {
    this.isEditModalOpen = true;
    this.currentLaboratoire = { ...laboratoire }; // Clone pour éviter les références
  }

  // Fermeture du modal de modification
  closeEditModal() {
    this.isEditModalOpen = false;
    this.currentLaboratoire = new Laboratoire();
  }

  updateLaboratoire(): void {
    const labo: Laboratoire = this.currentLaboratoire;  // Utilisez les données de laboratoire existantes
    this.laboratoireService.updateLaboratoire(this.currentLaboratoire.id, labo, this.selectedFile).subscribe(response => {
      // Gérer la réponse (fermer le modal, mettre à jour la liste, etc.)
      this.closeEditModal();
      this.getLaboratoires(); // Rafraîchir la liste des laboratoires
    });
  }


  // Sauvegarde du contact
  saveContact() {
    this.newContact.laboratoire = this.newLaboratoire;  // Associer le labo au contact
    this.contactLaboService.createContactLaboratoire(this.newContact).subscribe(
      (contact) => {
        console.log('Contact sauvegardé:', contact);
        this.newContact = contact;
        this.currentStep = 3; // Passer à l'étape Adresse
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde du contact:', error);
      }
    );
  }
  isPopupVisible = false; // Contrôle l'affichage du popup
  closePopup() {
    this.isPopupVisible = false;

    this.closeAddModal();
  }
  
  addAnotherContact() {
    // Réinitialise les objets de formulaire pour le contact et l'adresse
    this.newContact = new ContactLabo();
    this.newAdresse = new Adresse();
  
    // Associe le même laboratoire au nouveau contact
    this.newContact.laboratoire = this.newLaboratoire;
    this.isPopupVisible = false;
    // Passe à l'étape 2 (formulaire de contact)
    this.currentStep = 2;
    this.isModalOpen = true;
    this.x=false;
  }
  
  
  // Sauvegarde de l'adresse et finalisation du contact
  saveAdresse() {
    this.newContact.laboratoire = this.newLaboratoire; 
    this.adresseService.createAdresse(this.newAdresse).subscribe(
      (adresse) => {
        console.log('Adresse sauvegardée:', adresse);

        // Associer l'adresse au contact et sauvegarder le contact finalisé
        this.newContact.adresse = adresse;
        this.contactLaboService.createContactLaboratoire(this.newContact).subscribe(
          (contact) => {
            
            console.log('Contact final sauvegardé:', contact);
            this.isPopupVisible = true;
             // Afficher le popup
            this.getLaboratoires(); // Mise à jour de la liste des laboratoires
           
          },
          (error) => {
            console.error('Erreur lors de la sauvegarde du contact final:', error);
            // Ajout d'un message d'erreur plus descriptif
          if (error.error && error.error.message) {
            console.error('Détail de l\'erreur:', error.error.message);
          }
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde de l\'adresse:', error);
        if (error.error && error.error.message) {
          console.error('Détail de l\'erreur:', error.error.message);
        }
      }
    );
  }
  deleteLaboratoireAndContact() {
    if (this.newContact.id) {
      // Supprimer le contact associé
      this.contactLaboService.deleteContactLaboratoire(this.newContact.id).subscribe(
        () => {
          console.log('Contact supprimé avec succès.');
  
          if (this.newLaboratoire.id) {
            // Supprimer le laboratoire
            this.laboratoireService.deleteLaboratoire(this.newLaboratoire.id).subscribe(
              () => {
                console.log('Laboratoire supprimé avec succès.');
                this.closeAddModal(); // Fermer la modal
                this.getLaboratoires(); // Actualiser la liste des laboratoires
              },
              (error) => {
                console.error('Erreur lors de la suppression du laboratoire:', error);
              }
            );
          } else {
            console.error('ID du laboratoire non défini.');
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression du contact:', error);
        }
      );
    } else {
      console.error('ID du contact non défini.');
    }
  }
  deleteContact() {
    if (this.newContact.id) {
      // Supprimer le contact associé
      this.contactLaboService.deleteContactLaboratoire(this.newContact.id).subscribe(
        () => {
          console.log('Contact supprimé avec succès.');
          this.closeModal(); // Fermer la modal
          this.getLaboratoires(); // Actualiser la liste des laboratoires
        },
        (error) => {
          console.error('Erreur lors de la suppression du contact:', error);
        }
      );
    } else {
      console.error('ID du contact non défini.');
    }
  }
  handleAnnuler() {
    if (this.x) {
      // Si x est true, on supprime à la fois le laboratoire et le contact
      this.deleteLaboratoireAndContact();
    } else {
      // Si x est false, on ne supprime que le contact
      this.deleteContact();
    }
  }
    // Méthode pour supprimer un laboratoire et ses dépendances
    supprimerLaboratoire(laboratoireId: number) {
      this.contactLaboService.getContactsByLaboratoireId(laboratoireId).subscribe(
        (contacts) => {
          // Supprimer chaque contact associé au laboratoire
          contacts.forEach((contact) => {
            if (contact.adresse?.id) {
              // Supprimer l'adresse associée au contact
              this.adresseService.deleteAdresse(contact.adresse.id).subscribe(
                () => console.log(`Adresse avec ID ${contact.adresse?.id} supprimée avec succès.`),
                (error) => console.error(`Erreur lors de la suppression de l'adresse avec ID ${contact.adresse?.id}:`, error)
              );
            }
  
            // Supprimer le contact
            this.contactLaboService.deleteContact(contact.id).subscribe(
              () => console.log(`Contact avec ID ${contact.id} supprimé avec succès.`),
              (error) => console.error(`Erreur lors de la suppression du contact avec ID ${contact.id}:`, error)
            );
          });
  
          // Après avoir supprimé les contacts et adresses, supprimer le laboratoire
          this.laboratoireService.desactiverLaboratoire(laboratoireId).subscribe(
            () => {
              console.log(`Laboratoire avec ID ${laboratoireId} supprimé avec succès.`);
              this.getLaboratoires(); // Actualiser la liste des laboratoires
            },
            (error) => {
              console.error(`Erreur lors de la suppression du laboratoire avec ID ${laboratoireId}:`, error);
            }
          );
        },
        (error) => {
          console.error(`Erreur lors de la récupération des contacts pour le laboratoire avec ID ${laboratoireId}:`, error);
        }
      );
    }



    confirmerSuppression(laboratoireId: number) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Cette action supprimera le laboratoire et toutes ses dépendances !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.supprimerLaboratoire(laboratoireId);
          Swal.fire(
            'Supprimé !',
            'Le laboratoire a été supprimé avec succès.',
            'success'
          );
        }
      });
    }
    navigateToCrudLabo(laboratoireId: number) {
      
      this.router.navigate(['crud-labo', laboratoireId]);
  
    }
   
    
  
}
