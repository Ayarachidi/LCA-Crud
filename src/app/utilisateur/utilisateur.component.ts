import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Laboratoire } from '../laboratoire';
import { LaboratoireService } from '../laboratoire.service';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-utilisateur',
  standalone: true,
  providers: [UserService,LaboratoireService],
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'] // Correction ici
})
export class UtilisateurComponent {
  utilisateurs: User[] = [];
  isAddUserModalOpen = false;
  newUser: User = {} as User;
  signatureFile!: File;
  laboratoires: Laboratoire[] = []; // Liste des laboratoires;
  currentUtilisateur: User = new User(); 
  isEditModalOpen = false; // Gestion du modal d'édition
  
  

  constructor(private userService: UserService,private laboratoireService:LaboratoireService) {}

  ngOnInit(): void {
    this.getUtilisateurs();
    this.getLaboratoires();
    
  }

  // Open modal
  openAddUserModal() {
    this.newUser = {} as User;
  this.signatureFile = null!;
    this.isAddUserModalOpen = true;
  }

  // Close modal
  closeAddUserModal() {
    this.isAddUserModalOpen = false;
  }

  addUser() {
    const formData = new FormData();
    formData.append('email', this.newUser.email);
    formData.append('nomComplet', this.newUser.nomComplet);
    formData.append('profession', this.newUser.profession);
    formData.append('numTel', this.newUser.numTel);
    formData.append('role', this.newUser.role);
    formData.append('motdepasse', this.newUser.motdepasse);
    formData.append('laboratoireId', String(this.newUser.laboratoireId));
  
    if (this.signatureFile) {
      console.log('Ajout du fichier de signature :', this.signatureFile.name);
      formData.append('signature', this.signatureFile, this.signatureFile.name);
    } else {
      console.warn('Aucun fichier de signature ajouté.');
    }
  
    this.userService.createUser(formData).subscribe(
      () => {
        console.log('Utilisateur ajouté avec succès.');
        this.getUtilisateurs();
        this.closeAddUserModal();
      },
      (error) => console.error('Erreur lors de l’ajout de l’utilisateur:', error)
    );
  }
  

  // Fetch users
  private getUtilisateurs() {
    this.userService.getActiveUsers().subscribe(
      (data) => (this.utilisateurs = data),
      (error) => console.error('Erreur lors de la récupération des utilisateurs:', error)
    );
  }
 getLaboratoires() {
    this.laboratoireService.getLaboratoiresList().subscribe(
      (data) => (this.laboratoires = data),
      (error) => console.error('Erreur lors de la récupération des laboratoires:', error)
    );
    
  }
  onLaboratoireChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLaboName = selectElement.value;
  
    if (!selectedLaboName) {
      console.log('Aucun laboratoire sélectionné');
      return;
    }
  
    const labo = this.laboratoires.find((l) => l.nom === selectedLaboName);
    if (labo) {
      this.newUser.laboratoireId = labo.id; // Attribuer l'ID correspondant
    }
  }
  
  // Mise à jour d'un laboratoire existant
  

  openEditModal(user: User) {
    this.isEditModalOpen = true;
    this.getLaboratoires(); 
    // Initialisation des données de l'utilisateur actuel
    this.currentUtilisateur = { ...user };
  
    // Associer l'ID du laboratoire actuel si nécessaire
    if (!this.currentUtilisateur.laboratoireId && user.laboratoire) {
      this.currentUtilisateur.laboratoireId = user.laboratoire.id;
    }
  }
  

  // Fermeture du modal de modification
  closeEditModal() {
    this.isEditModalOpen = false;
    this.currentUtilisateur = new User();
  }

  updateUtilisateur(): void {
    const utilisateur = this.currentUtilisateur;
    this.userService.updateUtilisateur(utilisateur.email, utilisateur, this.selectedSignature).subscribe(
      () => {
        this.getUtilisateurs(); // Rafraîchir la liste
        this.closeEditModal(); // Fermer le modal
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    );
  }
  
  
  selectedSignature: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedSignature = file;  // Mettez à jour le logo sélectionné
    }
  }
  onSignatureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.currentUtilisateur.signature = reader.result as string; // Base64
      };
      reader.readAsDataURL(file); // Lire le fichier comme URL Base64
    }
  }
  
  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input && input.files && input.files.length > 0) {
      this.selectedSignature = input.files[0];
      console.log("Fichier sélectionné :", this.selectedSignature.name);
    } else {
      this.selectedSignature = null;
      console.log("Aucun fichier de signature sélectionné.");
    }
  }

  supprimerUtilisateur(utilisateurId: string) {
    this.userService.desactiverUtilisateur(utilisateurId).subscribe(
      () => {
        console.log(`Utilisateur avec ID ${utilisateurId} désactivé avec succès.`);
        this.getUtilisateurs(); // Actualiser la liste des utilisateurs
      },
      (error) => {
        console.error(`Erreur lors de la désactivation de l'utilisateur avec ID ${utilisateurId}:`, error);
      }
    );
  }
  

  confirmerSuppression(utilisateurId: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action supprimera l'utilisateur !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supprimerUtilisateur(utilisateurId);
        Swal.fire(
          'Supprimé !',
          'L\'utilisateur a été supprimé avec succès.',
          'success'
        );
      }
    });
  }

  
  
}