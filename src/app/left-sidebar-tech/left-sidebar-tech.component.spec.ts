import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarTechComponent } from './left-sidebar-tech.component';

describe('LeftSidebarTechComponent', () => {
  let component: LeftSidebarTechComponent;
  let fixture: ComponentFixture<LeftSidebarTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSidebarTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSidebarTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
