import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  totalWeb(pagesNumber: number, languagesNum: number): number {
    const result = (pagesNumber * 30) + (languagesNum * 30);
    console.log(result);

    return result
  }

  constructor() { }
}
