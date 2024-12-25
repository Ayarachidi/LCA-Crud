import { Adresse } from './adresse';

describe('Adresse', () => {
  it('should create an instance', () => {
    const adresse = new Adresse(1, '123', 'Rue Exemple', '75001', 'Paris', 'Commune Ex', true);
    expect(adresse).toBeTruthy();
  });
});
