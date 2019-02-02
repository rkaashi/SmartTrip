import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDealsComponent } from './show-deals.component';

describe('ShowDealsComponent', () => {
  let component: ShowDealsComponent;
  let fixture: ComponentFixture<ShowDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
