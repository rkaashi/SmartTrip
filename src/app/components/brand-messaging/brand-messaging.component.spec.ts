import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMessagingComponent } from './brand-messaging.component';

describe('BrandMessagingComponent', () => {
  let component: BrandMessagingComponent;
  let fixture: ComponentFixture<BrandMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
