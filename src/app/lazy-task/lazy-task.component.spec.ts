import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTaskComponent } from './lazy-task.component';

describe('LazyTaskComponent', () => {
  let component: LazyTaskComponent;
  let fixture: ComponentFixture<LazyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
