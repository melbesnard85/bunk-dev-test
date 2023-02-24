import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  @Input() result$: Subject<any> | undefined;
  @Input() reset$: Subject<any> | undefined;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  total = 0;
  perPage = 10;

  page = 0;
  displayedColumns: string[] = ['name', 'amount'];
  dataSource = new MatTableDataSource<any>([]);
  clickedRows = new Set<any>();

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
  ) { }
  ngOnInit(): void {
    if (this.result$) {
      this.result$
        .asObservable()
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((res) => {
          this.dataSource.data = res.results;
          this.page = res.draw;
          this.total = res.recordsTotal; // TODO: have to create new api endpoint to integrate it.
        })
    }
    if (this.reset$) {
      this.reset$
        .asObservable()
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          this.page = 0;
          this.total = 0;
          this.dataSource.data = [];
        });
    }
  }

  showInfo(data: any) {
    
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  changePage(page: PageEvent) {
    this.change.emit({ page: page.pageIndex + 1, pageSize: page.pageIndex, results: page.length, });
  }
}
