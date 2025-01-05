import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakInitService } from './app/keycloak-init.service';

export function initializeApp(keycloakInitService: KeycloakInitService): () => Promise<void> {
  return () => keycloakInitService.initializeKeycloak();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [KeycloakInitService],
      multi: true,
    },
  ],
}).catch((err) => console.error('Error bootstrapping application:', err));
