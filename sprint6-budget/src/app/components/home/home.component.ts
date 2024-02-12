import { Component } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  works: Servicios[] = [];

  constructor(budgetService: BudgetService) {
    this.works = budgetService.budget;
  }
}
