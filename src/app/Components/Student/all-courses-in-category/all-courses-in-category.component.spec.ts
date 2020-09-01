import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesInCategoryComponent } from './all-courses-in-category.component';

describe('AllCoursesInCategoryComponent', () => {
  let component: AllCoursesInCategoryComponent;
  let fixture: ComponentFixture<AllCoursesInCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoursesInCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
