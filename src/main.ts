import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import keycloakConfig from './environments/keycloak.config';
import { APP_INITIALIZER } from '@angular/core';
import { Router } from '@angular/router';

// Fonction d'initialisation de Keycloak
export function initializeKeycloak(keycloak: KeycloakService, router: Router): Promise<void> {
  return keycloak
    .init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
    })
    .then(() => {
      const roles = keycloak.getUserRoles();

      // Redirection selon les rôles
      if (roles.includes('ROLE_ADMIN')) {
        router.navigate(['laboratoires']);
      } else if (roles.includes('ROLE_TECHNICIEN')) {
        router.navigate(['/analyses']);
      } else {
        router.navigate(['/acceuil']);
      }
    });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, KeycloakAngularModule),
    {
      provide: KeycloakService,
      useFactory: () => new KeycloakService(),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloak: KeycloakService, router: Router) => () => initializeKeycloak(keycloak, router),
      deps: [KeycloakService, Router],
      multi: true,
    },
  ],
}).catch((err) => console.error('Error bootstrapping application:', err));
