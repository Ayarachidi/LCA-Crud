import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTestAnalyseComponent } from './crud-test-analyse.component';

describe('CrudTestAnalyseComponent', () => {
  let component: CrudTestAnalyseComponent;
  let fixture: ComponentFixture<CrudTestAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTestAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTestAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
