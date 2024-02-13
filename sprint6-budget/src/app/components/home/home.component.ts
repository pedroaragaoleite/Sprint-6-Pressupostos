import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  works: Servicios[] = [];
  totalPrice: number = 0;

  formChecked = new FormGroup({
    checkbox0: new FormControl(false),
    checkbox1: new FormControl(false),
    checkbox2: new FormControl(false)
  })


  constructor(budgetService: BudgetService) {
    this.works = budgetService.budget;
    
  }

  selectedCheckBox: number[] = [];

  ngOnInit(): void {
    this.formChecked.valueChanges.subscribe(() => {
      this.updateCost();
    })     
  }

  updateCost() :void {
    this.totalPrice = 0;
    if(this.formChecked.get('checkbox0')?.value) {
      this.totalPrice += this.works[0].price;
    } 
    if(this.formChecked.get('checkbox1')?.value) {
      this.totalPrice += this.works[1].price;
    }
    if(this.formChecked.get('checkbox2')?.value) {
      this.totalPrice += this.works[2].price;
    }

    // this.selectedCheckBox.push(this.totalPrice)
  console.log(this.selectedCheckBox);
  
      
}
}
