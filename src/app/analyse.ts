export class Analyse {
    id: number;
    nom: string;
    description: string;
    isActive: boolean;
    laboratoireId: number;
  
    // Constructeur avec paramètres optionnels
    constructor(
      id: number = 0,
      nom: string = '',
      description: string = '',
      isActive: boolean = true,
      laboratoireId: number = 0
    ) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.isActive = isActive;
      this.laboratoireId = laboratoireId;
    }
  }
  