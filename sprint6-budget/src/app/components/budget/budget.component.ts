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
  @Input() dataParentForm: FormGroup = new FormGroup({});
  @Input() submitted: any;
  @Input() clients: Client[] = [];
  @Output() onSubmit = new EventEmitter<void>();

  submitForm() {
    this.onSubmit.emit();
  }

  // @Output();
}
