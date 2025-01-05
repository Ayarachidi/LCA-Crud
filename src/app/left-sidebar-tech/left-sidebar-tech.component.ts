import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeycloakInitService } from '../keycloak-init.service'; // Chemin corrigé

@Component({
  selector: 'app-left-sidebar-tech',
  standalone: true,
  imports: [RouterModule, CommonModule,HttpClientModule],
  providers:[KeycloakInitService],
  templateUrl: './left-sidebar-tech.component.html',
  styleUrl: './left-sidebar-tech.component.css'
})
export class LeftSidebarTechComponent {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  constructor(
    private Keycloakservice:KeycloakInitService,
  ){


  }

  items = [
   
    { routeLink: '/analyses', icon: 'fas fa-flask', label: 'Analyses' },
    { routeLink: '/patients', icon: 'fas fa-user', label: 'Patients' },


  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  signOut(): void {
    this.Keycloakservice.logout().then(() => {
      console.log('Utilisateur déconnecté');
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }
  
  
}