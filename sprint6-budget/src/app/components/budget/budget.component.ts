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

  // retrieve the value from the parent component
  @Input() clients: Client[] = [];

  // new array for the clientSearch button
  clientsSearch: Client[] = [];

  faMagnifyingGlass = faMagnifyingGlass;

  // click event to sort the names
  sortName(): void {
    this.clients.sort((a, b) => a.name.localeCompare(b.name));
    this.clientsSearch.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this.clients);
  }

  // click event to sort the prices
  sortPrice(): void {
    if (!this.isSorted) {
      this.clients.sort((a, b) => a.total - b.total)
      this.clientsSearch.sort((a, b) => a.total - b.total)
      this.isSorted = true;
    } else if (this.isSorted) {
      this.clients.reverse();
      this.clientsSearch.reverse();
      console.log(this.clients);
      this.isSorted = false;

    }
  }

  // click event to sort the date
  sortDate(): void {
    this.clients.sort((a: any, b: any) => a.formDate.getTime() - b.formDate.getTime());
  }

  // search button to filter the name in the clients array and search for the words that are in the value of the search input
  // and add to the new array 
  search(value: string): void {

    this.clientsSearch = this.clients.filter((name) => name.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    console.log(this.clientsSearch);

  }
}
