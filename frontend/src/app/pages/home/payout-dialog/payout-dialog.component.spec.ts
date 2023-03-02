import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDialogComponent } from './payout-dialog.component';

describe('PayoutDialogComponent', () => {
  let component: PayoutDialogComponent;
  let fixture: ComponentFixture<PayoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
