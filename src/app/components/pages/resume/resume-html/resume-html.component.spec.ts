import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeHTMLComponent } from './resume-html.component';

describe('ResumeHTMLComponent', () => {
  let component: ResumeHTMLComponent;
  let fixture: ComponentFixture<ResumeHTMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeHTMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
