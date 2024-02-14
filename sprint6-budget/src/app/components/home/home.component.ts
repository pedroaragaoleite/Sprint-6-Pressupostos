import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget/budget.service';
import { ProductsService } from '../../services/products/products.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  isChecked :any ;
  total: number = 0;

  // formChecked = new FormGroup({
  //   checkbox0: new FormControl(false),
  //   checkbox1: new FormControl(false),
  //   checkbox2: new FormControl(false)
  // })

  serviciosForm: FormGroup = new FormGroup({});


  constructor(budgetService: BudgetService, productsService: ProductsService, private fb: FormBuilder) {
    this.products = productsService.products;  
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
      this.updateCost2();
    })     
  }

  updateCost2() {
    this.totalPrice = 0;
    this.selectedCheckBox = [];

    this.products.forEach((product, index) => {
      if(this.serviciosForm.get(`checkbox${index}`)?.value) {
        this.selectedCheckBox.push(product.price);
        this.totalPrice += product.price;
      }
      if(this.serviciosForm.get('checkbox2')?.value) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    });

    this.total = this.selectedCheckBox.reduce((acc:number, value:number) => acc + value, 0);
  }

 


//   updateCost() :void {
//     this.totalPrice = 0;
//     this.selectedCheckBox = [];
//     if(this.serviciosForm.get('checkbox0')?.value) {
//       const price = this.products[0].price;
//       this.selectedCheckBox.push(price);
//       this.totalPrice += price;
//       console.log(this.serviciosForm.controls?.['checkbox0'].value);
      
//     } else {
//       console.log(this.serviciosForm.controls?.['checkbox0'].value);
//     }

//     if(this.serviciosForm.get('checkbox1')?.value) {
//       const price = this.products[1].price;
//       this.selectedCheckBox.push(price);
//       this.totalPrice += price;
//     }
//     if(this.serviciosForm.get('checkbox2')?.value) {
//       const price = this.products[2].price;
//       this.selectedCheckBox.push(price);
//       this.totalPrice += price;
//       this.isChecked = (this.serviciosForm.get('checkbox2')?.value)
//       console.log(this.isChecked);
      
//     } else {
//       this.isChecked = false;
//     }

//     // this.selectedCheckBox.push(this.totalPrice)
//   console.log(this.selectedCheckBox);
  
      
// }
}
