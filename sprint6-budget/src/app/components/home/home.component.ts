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
  isChecked: any;
  total: number = 0;
  webCost: number = 0;
  name: string = '';
  telephone: string = '';
  email: string = "";
  services: any[] = [];
  submitted: boolean = false;

  serviciosForm: FormGroup = new FormGroup({});
  budgetService: BudgetService;


  constructor(budgetService: BudgetService, productsService: ProductsService, private fb: FormBuilder) {
    this.products = productsService.products;
    this.budgetService = budgetService;
  }

  ngOnInit(): void {
    this.serviciosForm = this.fb.group({
      checkbox0: false,
      checkbox1: false,
      checkbox2: false,
      pagesNum: [1, [Validators.required, Validators.min(1)]],
      languagesNum: [1, [Validators.required, Validators.min(1)]],
      name: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });


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
      this.webCost = this.budgetService.totalWeb(this.serviciosForm.value.pagesNum, this.serviciosForm.value.languagesNum);
      this.selectedCheckBox.push(this.webCost);
      // console.log(this.webCost);

    } else {
      this.isChecked = false;
    }
    // console.log(this.selectedCheckBox);
    // console.log(this.services);



    this.total = this.selectedCheckBox.reduce((acc: number, value: number) => acc + value, 0);
    // this.services.push(this.total)
    // console.log(this.services);

  }

  onSubmit() {
    this.submitted = true;
    if (this.total === 0) {
      console.log("you need to select a service");
      console.log(this.submitted);


    } else if (this.serviciosForm.valid) {
      this.name = this.serviciosForm.get('name')?.value;
      this.telephone = this.serviciosForm.get('telephone')?.value;
      this.email = this.serviciosForm.get('email')?.value;

      const newClient: Client = {
        name: this.name,
        telephone: this.telephone,
        email: this.email,
        total: this.total,
        services: this.services,
      }

      this.clients.push(newClient);
      console.log(this.clients);

    } else {
      console.log("submited");


    }
  }
}
