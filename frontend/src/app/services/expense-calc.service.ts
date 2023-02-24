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

  payouts(data: Expenses): Observable<any> {
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }
    const _data = JSON.stringify(data)
    const body = new HttpParams()
      .set('expenses', _data);
    const api_url = "http://localhost:3000/payouts";
    return this.http.post<any>(api_url, body.toString(), { 'headers': headers });
  }

}
