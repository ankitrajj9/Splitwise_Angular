import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableBackComponent } from './disable-back.component';

describe('DisableBackComponent', () => {
  let component: DisableBackComponent;
  let fixture: ComponentFixture<DisableBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
