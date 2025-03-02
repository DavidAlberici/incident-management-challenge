import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceEditorWrapperComponent } from './incidence-editor-wrapper.component';

describe('IncidenceEditorWrapperComponent', () => {
  let component: IncidenceEditorWrapperComponent;
  let fixture: ComponentFixture<IncidenceEditorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceEditorWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceEditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
