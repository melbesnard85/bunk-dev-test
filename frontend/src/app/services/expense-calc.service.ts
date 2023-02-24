import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../core/models/expenses.model';
import { SearchResult } from '../core/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCalcService {

  constructor(private http: HttpClient) { }

  getExpenses(page = 1, perPage = 9): Observable<SearchResult<Expenses>> {
    const api_url = "http://localhost:3000/expenses";
    let params = new HttpParams().append('results', perPage).append('page', page);
    return this.http.get<SearchResult<Expenses>>(api_url, { params });
  }
}
