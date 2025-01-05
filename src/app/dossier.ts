import { Patient } from './patient';


export class Dossier {
    numDossier: number;
    utilisateurId: string;
    patient?: Patient;

    // Constructeur avec des paramètres optionnels
    constructor(
        numDossier: number = 0,
        utilisateurId: string = '',
        patient?: Patient
    ) {
        this.numDossier = numDossier;
        this.utilisateurId = utilisateurId;
        this.patient = patient;
    }
}
