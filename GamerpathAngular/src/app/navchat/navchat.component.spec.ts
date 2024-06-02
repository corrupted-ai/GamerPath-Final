import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavchatComponent } from './navchat.component';

describe('NavchatComponent', () => {
  let component: NavchatComponent;
  let fixture: ComponentFixture<NavchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
