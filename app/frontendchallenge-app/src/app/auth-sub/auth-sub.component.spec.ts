import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubComponent } from './auth-sub.component';

describe('AuthSubComponent', () => {
  let component: AuthSubComponent;
  let fixture: ComponentFixture<AuthSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
