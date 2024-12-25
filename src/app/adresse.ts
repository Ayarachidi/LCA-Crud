export class Adresse { 
    id: number;
    numVoie: string;
    nomVoie: string;
    codePostal: string;
    ville: string;
    commune: string;
    isActive: Boolean;

    constructor(
        id: number = 0, 
        numVoie: string = '', 
        nomVoie: string = '', 
        codePostal: string = '', 
        ville: string = '', 
        commune: string = '', 
        isActive: Boolean = true
    ) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
        this.isActive = isActive;
    }
}
