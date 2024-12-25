import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdresseComponent } from './new-adresse.component';

describe('NewAdresseComponent', () => {
  let component: NewAdresseComponent;
  let fixture: ComponentFixture<NewAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
