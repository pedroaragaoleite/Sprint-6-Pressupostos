import { Injectable } from '@angular/core';
import { Servicios } from '../../models/servicios';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Servicios[] = [
    { title: "Seo", description: "Programació d'una web responsive completa", price: 300, check: false },
    { title: "Ads", description: "Programació d'una web responsive completa", price: 400, check: false },
    { title: "Web", description: "Programació d'una web responsive completa", price: 500, check: false }
  ];
  constructor() { }
}
