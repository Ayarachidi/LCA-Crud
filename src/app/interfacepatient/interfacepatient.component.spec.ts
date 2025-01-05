import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacepatientComponent } from './interfacepatient.component';

describe('InterfacepatientComponent', () => {
  let component: InterfacepatientComponent;
  let fixture: ComponentFixture<InterfacepatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfacepatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
