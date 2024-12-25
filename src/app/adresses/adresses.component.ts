import { Component, OnInit } from '@angular/core';
import { AdresseService } from '../adresse.service';
import { Adresse } from '../adresse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-adresses',
  standalone: true,
  imports: [CommonModule, FormsModule],  // HttpClientModule n'est pas nécessaire ici, il est déjà dans le AppModule
  providers: [AdresseService],
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {
  adresses: Adresse[] = [];
  isModalOpen = false;
  isEditMode = false;
  adresseToEdit: Adresse | null = null;
  newAdresse: Adresse = new Adresse(0, '', '', '', '', '', true);
  
  isDeleteModalOpen = false; // Gérer l'état du modal de suppression
  adresseToDelete: Adresse | null = null; // Stocker l'adresse à supprimer

  constructor(private adresseservice: AdresseService) {}

  ngOnInit(): void {
    this.getAdresses();
  }

  private getAdresses() {
    this.adresseservice.getAdressesList().subscribe(data => {
      this.adresses = data;
    }, error => {
      console.error("Erreur lors de la récupération des adresses :", error);
    });
  }

  openModal(adresse: Adresse | null = null) {
    if (adresse) {
      this.isEditMode = true;
      this.adresseToEdit = { ...adresse };
      this.newAdresse = { ...adresse };  // Pour l'édition, on utilise l'adresse à modifier
    } else {
      this.isEditMode = false;
      this.newAdresse = new Adresse(0, '', '', '', '', '', true);  // Réinitialisation pour une nouvelle adresse
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  saveAdresse() {
    if (this.isEditMode && this.adresseToEdit && this.adresseToEdit.id) {
      this.adresseservice.updateAdresse(this.adresseToEdit.id, this.newAdresse).subscribe(
        updatedAdresse => {
          const index = this.adresses.findIndex(adresse => adresse.id === updatedAdresse.id);
          if (index !== -1) {
            this.adresses[index] = updatedAdresse;
          }
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'adresse:', error);
        }
      );
    } else {
      this.adresseservice.createAdresse(this.newAdresse).subscribe(
        adresse => {
          this.adresses.push(adresse);
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'adresse:', error);
        }
      );
    }
  }

  resetForm() {
    this.newAdresse = new Adresse(0, '', '', '', '', '', true);  // Réinitialisation du formulaire
  }

  // Fonction pour ouvrir le modal de suppression
  openDeleteModal(adresse: Adresse) {
    this.isDeleteModalOpen = true;
    this.adresseToDelete = adresse;
  }

  // Fermer le modal de suppression
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.adresseToDelete = null;
  }

  // Fonction pour supprimer l'adresse
  deleteAdresse() {
    if (this.adresseToDelete) {
      this.adresseservice.deleteAdresse(this.adresseToDelete.id).subscribe(
        () => {
          // Supprimer l'adresse de la liste locale
          this.adresses = this.adresses.filter(adresse => adresse.id !== this.adresseToDelete?.id);
          
          // Afficher un message de confirmation dans la console
          console.log('Adresse supprimée:', this.adresseToDelete);
  
          this.closeDeleteModal(); // Fermer le modal
        },
        error => {
          console.error("Erreur lors de la suppression de l'adresse:", error);
        }
      );
    }
  }
}
