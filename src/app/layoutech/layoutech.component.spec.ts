import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutechComponent } from './layoutech.component';

describe('LayoutechComponent', () => {
  let component: LayoutechComponent;
  let fixture: ComponentFixture<LayoutechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
