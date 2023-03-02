import { Component, OnInit } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCalcService } from 'src/app/services/expense-calc.service';
import { TableChange } from 'src/app/core/models/table.model';
import { SearchResult } from 'src/app/core/models/http.model';
import { Expenses } from 'src/app/core/models/expenses.model';
import { MatDialog } from '@angular/material/dialog';
import { PayoutDialogComponent } from './payout-dialog/payout-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private expenseCalService: ExpenseCalcService,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) { }

  isLoading = false;
  firstLoaded = false;
  result$: Subject<SearchResult<Expenses>> = new Subject<SearchResult<Expenses>>();
  reset$: Subject<any> = new Subject<any>();

  tbData: any;

  keyword!: string;
  page: number | undefined;

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {
    this.firstLoaded = true;
    this.reset$.next(null);
    this.searchExpenses();
  }

  changeTable(event: TableChange) {
    if (!this.firstLoaded) {
      return;
    }
    this.page = event.page;
    this.searchExpenses();
  }

  settleUp() {
    this.isLoading = true;
    this.expenseCalService.payouts(this.tbData)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res) => {
          this.openDialog('0ms', '0ms', res)
        },
        error: (err) => {
          this.snack.open(err.error.message);
        }
      })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    this.dialog.open(PayoutDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
  }

  private searchExpenses() {
    this.isLoading = true;
    this.expenseCalService.getExpenses(this.page, 10)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res) => {
          this.result$.next(res);
          this.tbData = res.results;
        },
        error: (err) => {
          this.snack.open(err.error.message);
          this.reset$.next(null);
        }
      })
  }
}
