import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  faArrowRight = faArrowRight;
  @Input() dataParentForm: FormGroup = new FormGroup({});
  @Output() onSubmit = new EventEmitter<void>();

submitForm(){
  this.onSubmit.emit();
}

  // @Output();
}
