import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylistAddComponent } from './paylist-add.component';

describe('PaylistAddComponent', () => {
  let component: PaylistAddComponent;
  let fixture: ComponentFixture<PaylistAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylistAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
