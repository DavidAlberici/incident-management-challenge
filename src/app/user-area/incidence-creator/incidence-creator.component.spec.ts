import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceCreatorComponent } from './incidence-creator.component';

describe('IncidenceCreatorComponent', () => {
  let component: IncidenceCreatorComponent;
  let fixture: ComponentFixture<IncidenceCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
