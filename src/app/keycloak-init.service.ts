import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import keycloakConfig from '../environments/keycloak.config';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  initializeKeycloak(): Promise<void> {
    return this.keycloak
      .init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
      })
      .then(() => {
        const roles = this.keycloak.getUserRoles();

        // Redirection selon les rôles
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/laboratoires']);
        
        }
        if (roles.includes('ROLE_TECHNICIEN')) {
          this.router.navigate(['/analyses']);
        
        } else {
          this.router.navigate(['/acceuil']);
        }
      });
  }
}
