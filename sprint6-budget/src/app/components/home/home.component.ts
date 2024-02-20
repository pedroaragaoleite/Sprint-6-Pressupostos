import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../models/servicios';
import { BudgetService } from '../../services/budget/budget.service';
import { ProductsService } from '../../services/products/products.service';
import { Client } from '../../models/clients';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetComponent } from '../budget/budget.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { telephoneValidator, emailValidator } from '../../validators/custom.validator';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, PanelComponent, BudgetComponent, FontAwesomeModule, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  faArrowRight = faArrowRight;
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
    telephone: ["", [Validators.required, telephoneValidator()]],
    email: ["", [Validators.required, Validators.email, emailValidator()]]
  });
  invalid: any;

  constructor(budgetService: BudgetService, productsService: ProductsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    this.routerParams();
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
      this.forceReset();


      this.submitted = false;
    }
  }

  forceReset(): void {
    this.serviciosForm.reset({
      checkbox0: false,
      checkbox1: false,
      checkbox2: false,
      pagesNum: 1,
      languagesNum: 1,
      name: "",
      telephone: "",
      email: ""
    })
  }

  routerParams(): void {

    let seoParam: boolean = this.serviciosForm.get('checkbox0')?.value || false;
    let webParam: boolean = this.serviciosForm.get('checkbox1')?.value || false;
    let adsParam: boolean = this.serviciosForm.get('checkbox2')?.value || false;
    let pagesParam: number = this.serviciosForm.value.pagesNum || 0;
    let langParam: number = this.serviciosForm.value.languagesNum || 0;


    this.router.navigate(['/'], {
      queryParams: {
        seo: seoParam,
        web: webParam,
        ads: adsParam,
        pages: pagesParam,
        lang: langParam
      }
    });
  }
}
