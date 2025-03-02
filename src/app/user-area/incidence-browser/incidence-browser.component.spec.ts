import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceBrowserComponent } from './incidence-browser.component';

describe('IncidenceBrowserComponent', () => {
  let component: IncidenceBrowserComponent;
  let fixture: ComponentFixture<IncidenceBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
