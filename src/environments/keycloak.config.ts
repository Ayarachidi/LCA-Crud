import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:9090', // Assurez-vous que "/auth" est présent
  realm: 'Customer',
  clientId: 'Customer',
  
};

export default keycloakConfig;
