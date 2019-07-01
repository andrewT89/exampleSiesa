import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) {}

  getProduct() {
    return this._http.get(`${URL_SERVICES}/api/getProduct.php`);
  }

  createProduct(product: Product) {
    let saveProduct = {
      nameProd: product.nameProd,
      descProd: product.descProd,
      price: product.price,
      disccount: product.disccount,
      createdOn: new Date(product.createdOn),
    };

    const url = `${URL_SERVICES}/api/createProduct.php`;
    let json = JSON.stringify(saveProduct),
    headers = new HttpHeaders().set('Content-Type','text/plain');
    return this._http
      .post<Product>(url, json, {headers: headers});
  }

  updateProduct(product: Product) {
    let updProduct = {
      id: product.id,
      nameProd: product.nameProd,
      descProd: product.descProd,
      price: product.price,
      disccount: product.disccount,
      createdOn: new Date(product.createdOn)
    };
    debugger;
    let url = `${URL_SERVICES}/api/updateProduct.php`,
    json = JSON.stringify(updProduct),
    headers = new HttpHeaders().set('Content-Type','text/plain');

    return this._http.put<Product>(url, json, {headers: headers}); 
  }

  deleteProduct(id: any) {
    return this._http.delete<Product>(`${URL_SERVICES}/api/deleteProduct.php/?id=${parseInt(id)}`);
  }
}
