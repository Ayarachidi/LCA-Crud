export class Patient {
    id: number;
    nomComplet: string;
    dateNaissance: Date;
    lieuNaissance: string;
    sexe: string;
    typePieceIdentite: string;
    numPieceIdentite: string;
    adresse: string;
    numTel: string;
    email: string;
    visiblePour: boolean;
    isActive: boolean;
    motdepasse: string;
    //dossiers: any[]; // Remplacez `any` par le type correct si vous avez une classe ou interface pour `Dossier`.
  
    // Constructeur avec paramètres optionnels
    constructor(
      id: number = 0,
      nomComplet: string = '',
      dateNaissance: Date = new Date(),
      lieuNaissance: string = '',
      sexe: string = '',
      typePieceIdentite: string = '',
      numPieceIdentite: string = '',
      adresse: string = '',
      numTel: string = '',
      email: string = '',
      visiblePour: boolean = false,
      isActive: boolean = true,
      motdepasse: string = '',
      //dossiers: any[] = [] // Remplacez `any` par le type correct si disponible.
    ) {
      this.id = id;
      this.nomComplet = nomComplet;
      this.dateNaissance = dateNaissance;
      this.lieuNaissance = lieuNaissance;
      this.sexe = sexe;
      this.typePieceIdentite = typePieceIdentite;
      this.numPieceIdentite = numPieceIdentite;
      this.adresse = adresse;
      this.numTel = numTel;
      this.email = email;
      this.visiblePour = visiblePour;
      this.isActive = isActive;
      this.motdepasse = motdepasse;
      //this.dossiers = dossiers;
    }
  }
  