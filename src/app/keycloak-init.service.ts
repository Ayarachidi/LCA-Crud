import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import keycloakConfig from '../environments/keycloak.config';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  private usernameSubject = new BehaviorSubject<string | undefined>(undefined);
  username$: Observable<string | undefined> = this.usernameSubject.asObservable();

  constructor(private keycloak: KeycloakService, private router: Router) {}

  initializeKeycloak(): Promise<void> {
    return this.keycloak
      .init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'check-sso', // Vérifie l'état de session sans redirection automatique
          checkLoginIframe: false,
        },
      })
      .then(() => {
        const roles = this.keycloak.getUserRoles();
        const username = this.keycloak.getKeycloakInstance().tokenParsed?.['preferred_username'];

        if (username) {
          this.usernameSubject.next(username);
          console.log('Utilisateur connecté :', username);
        } else {
          console.error('Nom d\'utilisateur introuvable dans le token.');
        }

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/laboratoires']);
        } else if (roles.includes('ROLE_TECHNICIEN')) {
          this.router.navigate(['/analyses']);
        } else {
          this.router.navigate(['/acceuil']);
        }
      })
      .catch((err) => {
        console.error('Erreur lors de l\'initialisation de Keycloak :', err);
      });
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    // Appel de la méthode de déconnexion de Keycloak et redirection vers la page de login
    return this.keycloak.logout(window.location.origin).then(() => {
      console.log('Déconnexion réussie');
      // Redirection vers la page de login après déconnexion
      this.router.navigate(['/login']);
    }).catch((err) => {
      console.error('Erreur lors de la déconnexion :', err);
    });
  }
}
