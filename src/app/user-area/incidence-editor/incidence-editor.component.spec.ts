import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceEditorComponent } from './incidence-editor.component';

describe('IncidenceEditorComponent', () => {
  let component: IncidenceEditorComponent;
  let fixture: ComponentFixture<IncidenceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
