import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourseResultsComponent } from './search-course-results.component';

describe('SearchCourseResultsComponent', () => {
  let component: SearchCourseResultsComponent;
  let fixture: ComponentFixture<SearchCourseResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCourseResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourseResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
