import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAreaHomeComponent } from './user-area-home.component';

describe('UserAreaHomeComponent', () => {
  let component: UserAreaHomeComponent;
  let fixture: ComponentFixture<UserAreaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAreaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAreaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
