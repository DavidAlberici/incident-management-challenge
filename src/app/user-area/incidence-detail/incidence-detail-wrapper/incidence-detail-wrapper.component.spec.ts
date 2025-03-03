import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceDetailWrapperComponent } from './incidence-detail-wrapper.component';

describe('IncidenceDetailWrapperComponent', () => {
  let component: IncidenceDetailWrapperComponent;
  let fixture: ComponentFixture<IncidenceDetailWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceDetailWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
