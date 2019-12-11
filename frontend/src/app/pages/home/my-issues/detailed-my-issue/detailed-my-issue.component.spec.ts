import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMyIssueComponent } from './detailed-my-issue.component';

describe('DetailedMyIssueComponent', () => {
  let component: DetailedMyIssueComponent;
  let fixture: ComponentFixture<DetailedMyIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedMyIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedMyIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
