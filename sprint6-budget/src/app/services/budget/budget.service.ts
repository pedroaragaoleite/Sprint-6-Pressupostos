import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalWeb(pagesNumber: number, languagesNum: number):number {
    return (pagesNumber * languagesNum) * 30
  } 

  constructor() { }
}
