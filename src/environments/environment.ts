import keycloakConfig from "./keycloak.config";

export const environment = {
    production: false,
    userServiceUrl: '/USER-SERVICE/api/CrudUser/Utilisateurs',
    laboServiceUrl:'/LABO-CONTACT-ADRESSE-SERVICE/api/CrudLabo/laboratoires',
    contactServiceUrl: '/LABO-CONTACT-ADRESSE-SERVICE/api/CrudContactLabo/Contactslaboratoire',
    adresseServiceUrl: '/LABO-CONTACT-ADRESSE-SERVICE/api/CrudAdresse/adresses',
    keycloak: keycloakConfig,  // Configuration Keycloak
    gatewayUrl: 'http://localhost:8888'  // URL de base si nécessaire pour des accès directs
  };
  