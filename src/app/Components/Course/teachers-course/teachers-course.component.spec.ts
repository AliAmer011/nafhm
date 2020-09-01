import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCourseComponent } from './teachers-course.component';

describe('TeachersCourseComponent', () => {
  let component: TeachersCourseComponent;
  let fixture: ComponentFixture<TeachersCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
