import { Analyse } from "./analyse";

export class Epreuve {
    id: number;
    nom: string;
    analyse?: Analyse;
    isActive: boolean;
  
    // Constructeur avec paramètres optionnels
    constructor(id: number = 0, nom: string = '', isActive: boolean = true,analyse?: Analyse) {
      this.id = id;
      this.nom = nom;
      this.isActive = isActive;
      this.analyse = analyse;
    }
  }
  