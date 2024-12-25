import { Laboratoire } from './laboratoire';
export class User {
    email: string;
    nomComplet: string;
    profession: string;
    numTel: string;
    signature: string;
    role: string;
    motdepasse: string;
    isActive: boolean;
    laboratoireId: number;
    laboratoire?: Laboratoire;
  
    // Constructeur avec paramètres optionnels
    constructor(
      email: string = '',
      nomComplet: string = '',
      profession: string = '',
      numTel: string = '',
      signature: string = '',
      role: string = '',
      motdepasse: string = '',
      isActive: boolean = true,
      laboratoire?: Laboratoire,
      laboratoireId: number = 0
    ) {
      this.email = email;
      this.nomComplet = nomComplet;
      this.profession = profession;
      this.numTel = numTel;
      this.signature = signature;
      this.role = role;
      this.motdepasse = motdepasse;
      this.isActive = isActive;
      this.laboratoire = laboratoire;
      this.laboratoireId = laboratoireId;
    }
  }
  