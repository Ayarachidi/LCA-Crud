import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (!isLoggedIn) {
        console.log('Utilisateur non connecté, redirection vers la page de connexion.');
        await this.keycloakService.login();
        return false;
      }

      const roles = this.keycloakService.getUserRoles();
      console.log('Utilisateur authentifié, rôles:', roles);

      // Vérification des rôles nécessaires pour cette route
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles && !requiredRoles.some(role => roles.includes(role))) {
        console.log('Accès refusé : utilisateur sans rôle requis.');
        this.router.navigate(['/access-denied']); // Redirection vers une page d'erreur
        return false;
      }

      return true; // Autorise l'accès à la route demandée
    } catch (error) {
      console.error('Erreur d\'authentification ou de vérification des rôles:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
