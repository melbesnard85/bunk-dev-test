import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutModule } from 'src/app/layout/layout.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpenseTableComponent } from './expense-table/expense-table.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExpenseTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
