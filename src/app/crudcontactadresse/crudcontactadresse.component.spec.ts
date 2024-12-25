import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudcontactadresseComponent } from './crudcontactadresse.component';

describe('CrudcontactadresseComponent', () => {
  let component: CrudcontactadresseComponent;
  let fixture: ComponentFixture<CrudcontactadresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudcontactadresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudcontactadresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
