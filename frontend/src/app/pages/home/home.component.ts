import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCalcService } from 'src/app/services/expense-calc.service';
import { TableChange } from 'src/app/core/models/table.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private expenseCalService: ExpenseCalcService,
    private snack: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) { }

  isLoading = false;
  firstLoaded = false;
  result$: Subject<any> = new Subject<any>();
  reset$: Subject<any> = new Subject<any>();
  
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

  private searchExpenses() {
    this.isLoading = true;
    this.expenseCalService.getExpenses(this.page, 10)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res) => {
          this.result$.next(res);
        },
        error: (err) => {
          this.snack.open(err.error.message);
          this.reset$.next(null);
        }
      })
  }
}
