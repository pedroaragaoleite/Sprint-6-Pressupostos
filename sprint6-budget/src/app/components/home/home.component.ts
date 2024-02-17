import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget/budget.service';
import { ProductsService } from '../../services/products/products.service';
import { Client } from '../../models/clients';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetComponent } from '../budget/budget.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, PanelComponent, BudgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Servicios[] = [];
  clients: Client[] = []
  selectedCheckBox: number[] = [];
  isChecked: boolean = false;
  total: number = 0;
  webCost: number = 0;
  services: string[] = [];
  submitted: boolean = false;
  setDate: Date = new Date();


  budgetService: BudgetService;

  serviciosForm = this.fb.group({
    checkbox0: false,
    checkbox1: false,
    checkbox2: false,
    pagesNum: [1, [Validators.required, Validators.min(1)]],
    languagesNum: [1, [Validators.required, Validators.min(1)]],
    name: ["", [Validators.required]],
    telephone: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]]
  });

  constructor(budgetService: BudgetService, productsService: ProductsService, private fb: FormBuilder) {
    this.products = productsService.products;
    this.budgetService = budgetService;
  }

  ngOnInit(): void {
    this.serviciosForm.valueChanges.subscribe(() => {
      this.updateCost();
    })
  }


  updateCost() {
    this.total = 0;
    this.selectedCheckBox = [];
    this.services = [];

    this.products.forEach((product, index) => {
      if (this.serviciosForm.get(`checkbox${index}`)?.value) {
        this.selectedCheckBox.push(product.price);
        this.services.push(product.title)
      }
    });

    if (this.serviciosForm.get('checkbox2')?.value) {
      this.isChecked = true;
      this.webCost = this.budgetService.totalWeb(this.serviciosForm.value.pagesNum ?? 0, this.serviciosForm.value.languagesNum ?? 0);
      this.selectedCheckBox.push(this.webCost);
    } else {
      this.isChecked = false;
    }

    this.total = this.selectedCheckBox.reduce((acc: number, value: number) => acc + value, 0);

  }

  onSubmit() {
    this.submitted = true;
    this.setDate = new Date();

    if (this.total !== 0 && this.serviciosForm.valid) {

      const newClient: Client = {
        name: this.serviciosForm.get('name')?.value as string,
        telephone: this.serviciosForm.get('telephone')?.value as string,
        email: this.serviciosForm.get('email')?.value as string,
        total: this.total,
        services: this.services,
        nPages: this.serviciosForm.value.pagesNum ?? 0,
        nLanguages: this.serviciosForm.value.languagesNum ?? 0,
        formDate: this.setDate
      }

      this.clients.push(newClient);

      this.serviciosForm.reset();
      this.submitted = false;

    } else {
      console.log("something wrong ")

    }
  }
}
