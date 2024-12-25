import { Adresse } from './adresse';
import { Laboratoire } from './laboratoire';
export class ContactLabo {
    id: number;
    numTel: string;
    fax: string;
    email: string;
    isActive: boolean;
    laboratoire?: Laboratoire;
    adresse?: Adresse;
  
    // Constructeur avec paramètres optionnels
    constructor(
      id: number = 0,
      numTel: string = '',
      fax: string = '',
      email: string = '',
      isActive: boolean = true,
      laboratoire?: Laboratoire,
      adresse?: Adresse
    ) {
      this.id = id;
      this.numTel = numTel;
      this.fax = fax;
      this.email = email;
      this.isActive = isActive;
      this.laboratoire = laboratoire;
      this.adresse = adresse;
    }
  }
  
  