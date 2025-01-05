import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakInitService } from '../keycloak-init.service'; // Chemin corrigé
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  providers:[KeycloakInitService],
  imports: [RouterModule, CommonModule,HttpClientModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {

  
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  items = [
   
    { routeLink: 'laboratoires', icon: 'fas fa-flask', label: 'Laboratoires' },
    { routeLink: 'utilisateurs', icon: 'fas fa-user', label: 'Utilisateurs' },

  ];
   constructor(
      private Keycloakservice:KeycloakInitService,
    ){
    }

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
