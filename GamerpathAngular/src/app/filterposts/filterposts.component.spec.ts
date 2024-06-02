import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpostsComponent } from './filterposts.component';

describe('FilterpostsComponent', () => {
  let component: FilterpostsComponent;
  let fixture: ComponentFixture<FilterpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
