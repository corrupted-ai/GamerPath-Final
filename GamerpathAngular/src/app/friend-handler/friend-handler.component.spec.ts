import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendHandlerComponent } from './friend-handler.component';

describe('FriendHandlerComponent', () => {
  let component: FriendHandlerComponent;
  let fixture: ComponentFixture<FriendHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
