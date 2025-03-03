import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeCommentListComponent } from './realtime-comment-list.component';

describe('RealtimeCommentListComponent', () => {
  let component: RealtimeCommentListComponent;
  let fixture: ComponentFixture<RealtimeCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeCommentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimeCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
