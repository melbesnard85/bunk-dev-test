import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayoutsDetals, PayoutsResuls } from 'src/app/common/common';

@Component({
  selector: 'app-payout-dialog',
  templateUrl: './payout-dialog.component.html',
  styleUrls: ['./payout-dialog.component.css']
})

export class PayoutDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PayoutsResuls<PayoutsDetals>
  ) { }
}
