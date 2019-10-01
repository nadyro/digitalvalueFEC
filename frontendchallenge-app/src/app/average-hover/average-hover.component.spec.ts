import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageHoverComponent } from './average-hover.component';

describe('AverageHoverComponent', () => {
  let component: AverageHoverComponent;
  let fixture: ComponentFixture<AverageHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
