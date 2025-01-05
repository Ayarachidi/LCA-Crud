import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Dossier } from '../dossier';
import { KeycloakInitService } from '../keycloak-init.service';
import { DossierService } from '../dossier.service';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './patient.component.html',
  providers: [PatientService,DossierService],
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  analyseId!: number; // ID de l'analyse
  patients: Patient[] = []; // Liste des patients
  isAddPatientModalOpen = false;
  isEditPatienteModalOpen = false;
  newPatient: Patient = new Patient();
  currentPatient: Patient = new Patient();
  newDossier: Dossier = new Dossier();
  username: string | undefined;
  constructor(
    private keycloakInitService: KeycloakInitService,
    private cdr: ChangeDetectorRef,  // Inject ChangeDetectorRef dans le constructeur
    private router: Router, // Inject Router here
    private patientservice: PatientService,
    private dossierservice:DossierService,
  ) {}
  ngOnInit(): void {
    this.keycloakInitService.username$.subscribe((username) => {
      this.username = username;
      console.log('Valeur du username reçue dans le composant :', this.username);
      this.cdr.detectChanges(); // Forcer la détection des changements si nécessaire
      this.loadPatients();
    });
  }




     openModal(): void {
        this.isAddPatientModalOpen = true; // Ouvre le modal
      
        this.newPatient = new Patient();
        
       
      }
      closeModal(): void {
   
        this.isAddPatientModalOpen = false;  // Ferme le modal
        this.loadPatients();
      }
      savePatient() {
        console.log("Patient à envoyer:", this.newPatient);
      
        // Vérification du champ nomComplet
        if (!this.newPatient.nomComplet) {
          console.error("Le champ 'nomComplet' est requis !");
          return; // Ne pas envoyer la requête si ce champ est manquant
        }
      
        // Ajouter le patient
        this.patientservice.createPatient(this.newPatient).subscribe(
          (patient) => {
            console.log('Patient sauvegardé:', patient);
            this.newPatient = patient;
      
            // Préparer et créer le dossier lié au patient
            this.newDossier.utilisateurId = this.username ?? 'defaultUserId';
            this.newDossier.patient = this.newPatient;
      
            this.dossierservice.createDossier(this.newDossier).subscribe(
              (dossier) => {
                console.log('Dossier créé:', dossier);
                Swal.fire('Succès', 'Patient et dossier créés avec succès', 'success');
                this.closeModal();
              },
              (error) => {
                console.error('Erreur lors de la création du dossier:', error);
                Swal.fire('Erreur', 'Le patient a été ajouté, mais le dossier n’a pas pu être créé.', 'error');
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la sauvegarde du patient:', error);
            Swal.fire('Erreur', 'Échec lors de l’ajout du patient.', 'error');
          }
        );
      }
        
      loadPatients(): void { 
        this.patientservice.getActivePatients().subscribe(
          (data: Patient[]) => {
            this.patients = data;
            console.log('Patients actifs récupérés avec succès :', this.patients);
          },
          (error) => {
            console.error('Erreur lors de la récupération des patients actifs :', error);
          }
        );
      }

    
      editPatient(patientId: number) {
        this.patientservice.getPatientById(patientId).subscribe((patient) => {
          console.log('Patient récupéré:', patient); // Vérifiez ici la valeur de patient.sexe
          this.currentPatient = patient;
          this.isEditPatienteModalOpen = true;
        });
      }
      
  
     
      
            closeEditModal(): void {
              this.isEditPatienteModalOpen = false; 
              this.loadPatients();
            }
            updatePatient(){
              const p:Patient=this.currentPatient;
              this.patientservice.updatePatient(this.currentPatient.id, p).subscribe(response => {
                // Gérer la réponse (fermer le modal, mettre à jour la liste, etc.)
                this.closeEditModal();
               // Rafraîchir la liste 
              });
      
            }
      
      
       // Méthode pour désactiver un patient
  desactiverPatient(patientId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action désactivera le patient sélectionné !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, désactiver',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientservice.desactiverPatient(patientId).subscribe(
          () => {
            console.log(`Patient avec ID ${patientId} désactivé avec succès.`);
            Swal.fire(
              'Désactivé !',
              "Le patient a été désactivé avec succès.",
              'success'
            );
            this.loadPatients(); // Rechargez la liste des patients
          },
          (error) => {
            console.error(`Erreur lors de la désactivation du patient avec ID ${patientId}:`, error);
            Swal.fire(
              'Erreur',
              "Une erreur est survenue lors de la désactivation du patient.",
              'error'
            );
          }
        );
      }
    });
  }

  // Méthode pour confirmer la désactivation d'un patient
  confirmerDesactivationPatient(patientId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action désactivera définitivement le patient sélectionné !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, désactiver',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactiverPatient(patientId);
      }
    });
  }

  navigateToCrudDossier(patietId:number){
    this.router.navigate(['crud-dossier', patietId]);

  }

}
