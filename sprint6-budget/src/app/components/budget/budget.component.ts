import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { Client } from '../../models/clients';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  isSorted: boolean = false;
  @Input() clients: Client[] = [];

  faMagnifyingGlass = faMagnifyingGlass;
  sortNom(): void {
    this.clients.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this.clients);
  }

  sortPreu(): void {
    if (!this.isSorted) {
      this.clients.sort((a, b) => a.total - b.total)
      this.isSorted = true;
    } else if (this.isSorted) {
      this.clients.reverse();
      console.log(this.clients);

    }
  }
  sortDate(): void {
    this.clients.sort((a: any, b: any) => a.formDate.getTime() - b.formDate.getTime());
  }
}
