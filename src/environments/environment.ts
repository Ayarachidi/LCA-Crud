
import keycloakConfig from "./keycloak.config";

export const environment = {
    production: false,
    userServiceUrl: '/USER-SERVICE/api/CrudUser/Utilisateurs',
    laboServiceUrl:'/LABO-CONTACT-ADRESSE-SERVICE/api/CrudLabo/laboratoires',
    contactServiceUrl: '/LABO-CONTACT-ADRESSE-SERVICE/api/CrudContactLabo/Contactslaboratoire',
    adresseServiceUrl: '/LABO-CONTACT-ADRESSE-SERVICE/api/CrudAdresse/adresses',
    AnalyseServiceUrl:'/ANALYSE-MICROSERVICE/api/CrudAnalyse/analyses',
    EpreuveServiceUrl:'/ANALYSE-MICROSERVICE/api/CrudEpreuve/epreuves',
    TestAnalyseServiceUrl:'/ANALYSE-MICROSERVICE/api/CrudTestAnalyse/testsanalyse',
    PatientServiceUrl:'/PATIENT-SERVICE/api/CrudPatient/patients',
    DossierServiceUrl:'/PATIENT-SERVICE//api/CrudDossier/dossiers',
    ExamenServiceUrl:'/ANALYSE-MICROSERVICE/api/CrudExamen/examens',
    keycloak: keycloakConfig,  // Configuration Keycloak
    gatewayUrl: 'http://localhost:8888'  // URL de base si nécessaire pour des accès directs
  };
  