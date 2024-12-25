import { KeycloakService } from 'keycloak-angular';
import keycloakConfig from '../environments/keycloak.config';  // Importer la configuration

// Cette fonction est utilisée pour initialiser Keycloak lors du démarrage de l'application.
export function initializeKeycloak(keycloak: KeycloakService) {
  return (): Promise<any> =>
    keycloak.init({
      config: keycloakConfig,  // Utilisez la configuration que vous avez définie
      initOptions: {
        onLoad: 'login-required',  // Vous pouvez ajuster cette option en fonction de votre besoin
        checkLoginIframe: false,   // Désactiver le check iframe
      },
    });
}
