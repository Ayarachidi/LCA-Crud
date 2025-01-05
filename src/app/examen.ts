import { Analyse } from "./analyse";

export class Examen {
    id: number;
    fkNumDossier: number;
    analyse: Analyse;
    resultat: Record<string, number>;
    date: string | Date; // Accepte à la fois Date et chaîne
  
    constructor(
      id: number = 0,
      fkNumDossier: number = 0,
      analyse: Analyse = new Analyse(),
      resultat: Record<string, number> = {},
      date: string | Date = new Date() // Par défaut, une instance Date
    ) {
      this.id = id;
      this.fkNumDossier = fkNumDossier;
      this.analyse = analyse;
      this.resultat = resultat;
      this.date = date;
    }
  }
  