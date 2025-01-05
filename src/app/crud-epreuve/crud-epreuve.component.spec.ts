import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEpreuveComponent } from './crud-epreuve.component';

describe('CrudEpreuveComponent', () => {
  let component: CrudEpreuveComponent;
  let fixture: ComponentFixture<CrudEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
