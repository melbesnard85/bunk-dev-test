import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { firstValueFrom, of } from 'rxjs';

import { HomeComponent } from './home.component';
import { mockSearchResponse } from '../../mocks/search-response.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const expenseServiceSpy = jasmine.createSpyObj('getExpenses', ['search']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, MatSnackBarModule, MatCardModule
      ],
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit response when do fetch', (done: DoneFn) => {
    const fixture = TestBed.createComponent(HomeComponent);
    const searchBarComponent = fixture.componentInstance;

    expenseServiceSpy.search.and.returnValue(of({ ...mockSearchResponse }));
    fixture.detectChanges();

    firstValueFrom(searchBarComponent.result$.asObservable()).then((res) => {
      console.log("res : ", res)
      expect(res.results).toEqual(mockSearchResponse.results);
      done();
    });

    searchBarComponent.onSearch();
  });
});
