import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget/budget.service';
import { ProductsService } from '../../services/products/products.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Servicios[] = [];
  selectedCheckBox: number[] = [];
  totalPrice: number = 0;
  ischecked :any ;

  formChecked = new FormGroup({
    checkbox0: new FormControl(false),
    checkbox1: new FormControl(false),
    checkbox2: new FormControl(false)
  })


  constructor(budgetService: BudgetService, productsService: ProductsService) {
    this.products = productsService.products;
    
  }

 

  ngOnInit(): void {
    this.formChecked.valueChanges.subscribe(() => {
      this.updateCost();
    })     
  }

  updateCost() :void {
    this.totalPrice = 0;
    this.selectedCheckBox = [];
    if(this.formChecked.get('checkbox0')?.value) {
      const price = this.products[0].price;
      this.selectedCheckBox.push(price);
      this.totalPrice += price;
      console.log(this.formChecked.controls?.checkbox0.value);
      
    } else {
      console.log(this.formChecked.controls?.checkbox0.value);
    }

    if(this.formChecked.get('checkbox1')?.value) {
      const price = this.products[1].price;
      this.selectedCheckBox.push(price);
      this.totalPrice += price;
    }
    if(this.formChecked.get('checkbox2')?.value) {
      const price = this.products[2].price;
      this.selectedCheckBox.push(price);
      this.totalPrice += price;
      this.ischecked = (this.formChecked.get('checkbox2')?.value)
      console.log(this.ischecked);
      
    } else {
      this.ischecked = false;
    }

    // this.selectedCheckBox.push(this.totalPrice)
  console.log(this.selectedCheckBox);
  
      
}
}
