import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDossierComponent } from './crud-dossier.component';

describe('CrudDossierComponent', () => {
  let component: CrudDossierComponent;
  let fixture: ComponentFixture<CrudDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDossierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
