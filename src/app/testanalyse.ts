import { Analyse } from "./analyse";

export class Testanalyse {
    id: number;
    nomTest: string;
    sousEpreuve: string;
    intervalMinDeReference: number;
    intervalMaxDeReference: number;
    uniteDeReference: string;
    details: string;
    analyse?: Analyse;
    isActive: boolean;
  
    // Constructeur avec paramètres optionnels
    constructor(
      id: number = 0,
      nomTest: string = '',
      sousEpreuve: string = '',
      intervalMinDeReference: number = 0,
      intervalMaxDeReference: number = 0,
      uniteDeReference: string = '',
      details: string = '',
      isActive: boolean = true,
      analyse?: Analyse
    ) {
      this.id = id;
      this.nomTest = nomTest;
      this.sousEpreuve = sousEpreuve;
      this.intervalMinDeReference = intervalMinDeReference;
      this.intervalMaxDeReference = intervalMaxDeReference;
      this.uniteDeReference = uniteDeReference;
      this.details = details;
      this.isActive = isActive;
      this.analyse=analyse;
    }
  }
  