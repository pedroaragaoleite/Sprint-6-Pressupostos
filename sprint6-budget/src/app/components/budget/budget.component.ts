import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, FontAwesomeModule, NgIf],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  faArrowRight = faArrowRight;
  isSorted: boolean = false;
  @Input() dataParentForm: FormGroup = new FormGroup({});
  @Input() submitted: boolean = false;
  @Input() clients: Client[] = [];
  @Output() onSubmit = new EventEmitter<void>();

  // @Output() sortNom = new EventEmitter<void>();

  submitForm() {
    this.onSubmit.emit();
  }

  sortNom(): void {
    // this.sortNom.emit();
    // this.clients.sort((a: any, b: any) => a - b);
    // console.log(this.clients);
    this.clients.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this.clients);
  }

  sortPreu(): void {
    // this.isSorted = true;
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
