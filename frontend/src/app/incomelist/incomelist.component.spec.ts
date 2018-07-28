import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomelistComponent } from './incomelist.component';

describe('IncomelistComponent', () => {
  let component: IncomelistComponent;
  let fixture: ComponentFixture<IncomelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
