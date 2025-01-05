import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakInitService } from '../keycloak-init.service'; // Chemin corrigé

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  constructor(private keycloakInitService: KeycloakInitService) {}

  redirectToLogin(): void {
    this.keycloakInitService.login().catch((err: any) => {
      console.error('Erreur lors de la redirection vers Keycloak', err);
    });
  }
}
