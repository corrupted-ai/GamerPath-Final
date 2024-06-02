import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewthreadComponent } from './viewthread.component';

describe('ViewthreadComponent', () => {
  let component: ViewthreadComponent;
  let fixture: ComponentFixture<ViewthreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewthreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
