import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreenSharingComponent } from './add-screen-sharing.component';

describe('AddScreenSharingComponent', () => {
  let component: AddScreenSharingComponent;
  let fixture: ComponentFixture<AddScreenSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScreenSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreenSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
