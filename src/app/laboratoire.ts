export class Laboratoire { 
    id: number;
    nom: string;
    logo: string;
    nrc: string; 
    active: boolean;
    dateActivation: string; 
    isActive: boolean;
  
    // Constructeur avec paramètres optionnels
    constructor(
      id: number = 0,
      nom: string = '',
      logo: string = '',
      nrc: string = '',
      active: boolean = false,
      dateActivation: string = '',
      isActive: boolean = true
    ) {
      this.id = id; 
      this.nom = nom; 
      this.logo = logo; 
      this.nrc = nrc; 
      this.active = active; 
      this.dateActivation = dateActivation; 
      this.isActive = isActive; 
    }
}
