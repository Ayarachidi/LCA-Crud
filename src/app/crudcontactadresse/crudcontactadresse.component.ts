import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactLaboService } from '../contact-labo.service';
import { ContactLabo } from '../contact-labo'; // Importez le modèle ContactLabo si nécessaire
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { Adresse } from '../adresse';
import { FormsModule } from '@angular/forms';
import { AdresseService } from '../adresse.service';
import { LaboratoireService } from '../laboratoire.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crudcontactadresse',
  standalone: true, // Spécifie que ce composant est autonome
  imports: [CommonModule, HttpClientModule,FormsModule], // Déclarez HttpClientModule ici
  templateUrl: './crudcontactadresse.component.html',
  styleUrls: ['./crudcontactadresse.component.css'],
  providers: [LaboratoireService,ContactLaboService,AdresseService]
})
export class CrudcontactadresseComponent implements OnInit {
  laboratoireId!: number; // ID du laboratoire
  contacts: ContactLabo[] = []; // Liste des contacts
  address: any; // Adresse sélectionnée
  isModalOpen = false; // État d'ouverture du modal
  step: number = 1;
  newContact: ContactLabo = new ContactLabo();  // Nouvelle instance de ContactLabo
  newAddress: Adresse = new Adresse(); 
  isAddContactModalOpen = false;
  isEditContactModalOpen =false;
  currentContact: ContactLabo = new ContactLabo();  // Contact sélectionné
  currentAddress: Adresse = new Adresse();
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactLaboService,
    private adresseService: AdresseService,
    private laboratoireService :LaboratoireService
  ) {}

  ngOnInit(): void {
    this.laboratoireId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.laboratoireId) {
      this.loadContacts(this.laboratoireId);
    } else {
      console.error('ID du laboratoire invalide');
    }
  }

  loadContacts(laboratoireId: number): void {
    this.contactService.getContactsByLaboratoireId(laboratoireId).subscribe(
      (data) => {
        this.contacts = data;
        console.log('Contacts récupérés avec succès :', this.contacts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    );
  }

  showAddressDetails(contactId: number): void {
    this.contactService.getAdresseByContactId(contactId).subscribe(
      (data) => {
        this.address = data;
        this.isModalOpen = true; // Ouvre le modal
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'adresse :', error);
      }
    );
  }

  openModal(): void {
    this.isAddContactModalOpen = true; // Ouvre le modal
    this.step = 1;  // Réinitialise à l'étape 1
    this.newContact = new ContactLabo();  // Réinitialise le contact
    this.newAddress = new Adresse();  // Réinitialise l'adresse
  }

  closeModal(): void {
   
    this.isAddContactModalOpen = false;  // Ferme le modal
  }
  closeModal1(): void {
    this.isModalOpen = false; // Ferme le modal
  }


  nextStep(): void {
    this.step = 2;  // Passe à l'étape 2 (Adresse)
  }
  goToPreviousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
  editContact(contactId: number): void {
    this.contactService.getContactById(contactId).subscribe(
      (data) => {
        this.currentContact = data;
        this.contactService.getAdresseByContactId(contactId).subscribe(
          (addressData) => {
            this.currentAddress = addressData;
            this.isEditContactModalOpen = true; // Ouvre le modal
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'adresse :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération du contact :', error);
      }
    );
  }
  closeEditModal(): void {
    this.isEditContactModalOpen = false; // Ferme le modal
  }
  updateContact(): void {
    // Mettre à jour l'adresse
    this.adresseService.updateAdresse(this.currentAddress.id, this.currentAddress).subscribe(
      (updatedAddress) => {
        // L'adresse a été mise à jour, maintenant on met à jour le contact
        this.currentContact.adresse = updatedAddress;
        this.contactService.updateContactLaboratoire(this.currentContact.id, this.currentContact).subscribe(
          (updatedContact) => {
            console.log('Contact et adresse mis à jour avec succès :', updatedContact);
            // Recharger la liste des contacts
            this.loadContacts(this.laboratoireId);
            this.closeEditModal(); // Ferme le modal après la mise à jour
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du contact :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'adresse :', error);
      }
    );
  }
  goToNextStep(): void {
    this.step = 2;  // Passe à l'étape 2 (Adresse)
  }
  
    

  saveContact(): void {
    // Récupérer le laboratoire par ID
    this.laboratoireService.getLaboratoireById(this.laboratoireId).subscribe({
      next: (laboratoire) => {
        // Associer le laboratoire récupéré au contact
        this.newContact.laboratoire = laboratoire;
  
        // Enregistrer les données de l'adresse
        this.adresseService.createAdresse(this.newAddress).subscribe({
          next: (adresse) => {
            console.log('Adresse sauvegardée :', adresse);
  
            // Associer l'adresse sauvegardée au contact
            this.newContact.adresse = adresse;
  
            // Enregistrer le contact
            this.contactService.createContactLaboratoire(this.newContact).subscribe({
              next: (data) => {
                console.log('Contact ajouté avec succès :', data);
  
                // Recharger la liste des contacts et fermer le modal
                this.loadContacts(this.laboratoireId);
                this.closeModal();
              },
              error: (error) => {
                console.error('Erreur lors de l\'ajout du contact :', error);
              }
            });
          },
          error: (error) => {
            console.error('Erreur lors de la sauvegarde de l\'adresse :', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du laboratoire :', error);
      }
    });
  }
  supprimerContactEtAdresse(contactId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera le contact et désactivera l'adresse associée !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Récupérer l'adresse associée au contact
        this.contactService.getAdresseByContactId(contactId).subscribe(
          (adresse) => {
            if (adresse && adresse.id) {
              // Supprimer l'adresse associée avant de supprimer le contact
              this.adresseService.deleteAdresse(adresse.id).subscribe(
                () => {
                  console.log(`Adresse avec ID ${adresse.id} désactivée avec succès.`);
                  // Continuer avec la suppression du contact
                  this.contactService.deleteContact(contactId).subscribe(
                    () => {
                      console.log(`Contact avec ID ${contactId} supprimé avec succès.`);
                      Swal.fire(
                        'Supprimé !',
                        'Le contact et son adresse ont été supprimés avec succès.',
                        'success'
                      );
                      this.loadContacts(this.laboratoireId); // Actualiser la liste des contacts
                    },
                    (error) => {
                      console.error(`Erreur lors de la suppression du contact avec ID ${contactId}:`, error);
                      Swal.fire(
                        'Erreur',
                        "Une erreur est survenue lors de la suppression du contact.",
                        'error'
                      );
                    }
                  );
                },
                (error) => {
                  console.error(`Erreur lors de la désactivation de l'adresse avec ID ${adresse.id}:`, error);
                  Swal.fire(
                    'Erreur',
                    "Une erreur est survenue lors de la désactivation de l'adresse.",
                    'error'
                  );
                }
              );
            } else {
              console.log('Aucune adresse associée à ce contact.');
              // Supprimer directement le contact si aucune adresse n'est associée
              this.contactService.deleteContact(contactId).subscribe(
                () => {
                  console.log(`Contact avec ID ${contactId} supprimé avec succès.`);
                  Swal.fire(
                    'Supprimé !',
                    'Le contact a été supprimé avec succès.',
                    'success'
                  );
                     // Recharger la liste des contacts
                  this.loadContacts(this.laboratoireId);// Actualiser la liste des contacts
                },
                (error) => {
                  console.error(`Erreur lors de la suppression du contact avec ID ${contactId}:`, error);
                  Swal.fire(
                    'Erreur',
                    "Une erreur est survenue lors de la suppression du contact.",
                    'error'
                  );
                }
              );
            }
          },
          (error) => {
            console.error(`Erreur lors de la récupération de l'adresse pour le contact avec ID ${contactId}:`, error);
            Swal.fire(
              'Erreur',
              "Une erreur est survenue lors de la récupération de l'adresse.",
              'error'
            );
          }
        );
      }
    });
  }
  
  confirmerSuppressionContact(contactId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera définitivement le contact et désactivera l'adresse associée !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supprimerContactEtAdresse(contactId);
      }
    });
  }
    
  
}

  