import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget/budget.service';
import { ProductsService } from '../../services/products/products.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
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
  isChecked :any ;
  total: number = 0;
  webCost: number = 0;

  serviciosForm: FormGroup = new FormGroup({});
  budgetService: BudgetService;


  constructor(budgetService: BudgetService, productsService: ProductsService, private fb: FormBuilder) {
    this.products = productsService.products; 
    this.budgetService = budgetService; 
  } 

  ngOnInit(): void {
    this.serviciosForm = this.fb.group({
      checkbox0 : false,
      checkbox1: false,
      checkbox2: false,
      pagesNum: [1, [Validators.required, Validators.min(1)]],
      languagesNum: [1, [Validators.required, Validators.min(1)]]
    });


    this.serviciosForm.valueChanges.subscribe(() => {
      this.updateCost();
    })     
  }


  

  updateCost() {
    this.total = 0;
    this.selectedCheckBox = [];

    this.products.forEach((product, index) => {
      if(this.serviciosForm.get(`checkbox${index}`)?.value) {
        this.selectedCheckBox.push(product.price);
      }     
    });

    if(this.serviciosForm.get('checkbox2')?.value) {
      this.isChecked = true;
      this.webCost = this.budgetService.totalWeb(this.serviciosForm.value.pagesNum, this.serviciosForm.value.languagesNum);
      this.selectedCheckBox.push(this.webCost);  
      console.log(this.webCost);
      
    } else {
      this.isChecked = false;
    }

      
    this.total = this.selectedCheckBox.reduce((acc:number, value:number) => acc + value, 0);
  }
}
