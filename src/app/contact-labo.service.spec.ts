import { TestBed } from '@angular/core/testing';

import { ContactLaboService } from './contact-labo.service';

describe('ContactLaboService', () => {
  let service: ContactLaboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactLaboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
