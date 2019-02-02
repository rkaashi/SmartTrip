import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendPopularComponent } from './recommend-popular.component';

describe('RecommendPopularComponent', () => {
  let component: RecommendPopularComponent;
  let fixture: ComponentFixture<RecommendPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
