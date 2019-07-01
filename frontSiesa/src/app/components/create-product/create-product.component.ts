import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private _apiService: ApiServiceService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  saveProduct(form: NgForm) {
    let dateProd = this.formatDate(new Date(form.value.createdOn));
    const product = new Product();
    product.nameProd = form.value.nameProd;
    product.descProd = form.value.descProd;
    product.price = form.value.price;
    product.disccount = form.value.disccount;
    product.createdOn = dateProd;

    this._apiService
    .createProduct(product)
    .toPromise()
    .then((cProd: any) => {
      console.log(cProd);
    }).catch((err) => {
      console.log(err);
      if (err.status === 201 && err.statusText) {
        this._router.navigate(['listProduct']);
      }
    });
  }

  formatDate(date: Date) {
    if (!date) {
      return null;
    }
    var dd = date.getUTCDate();
    var mm = date.getUTCMonth() + 1;
    var yyyy = date.getUTCFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return yyyy + '-' + mm + '-' + dd +' '+ hour+':'+minutes+':'+seconds;
  }

}
