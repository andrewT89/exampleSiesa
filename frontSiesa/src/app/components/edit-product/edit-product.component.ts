import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  productUPD: Product = new Product();

  constructor(
    public _router: Router,
    private _apiService: ApiServiceService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.loadProductById(id);
      }
    });
   }

   loadProductById(id: string) {
    this._apiService
    .getProduct()
    .subscribe((resp: any) => {
      this.product = resp.find((el: any) => el.id == id);
      this.productUPD.id = this.product.id;
      this.productUPD.nameProd = this.product.nameProd;
      this.productUPD.descProd = this.product.descProd;
      this.productUPD.disccount = this.product.disccount;
      this.productUPD.price = this.product.price;
      this.productUPD.createdOn = this.product.createdOn;
    });
   }

   formatDate(date: Date) {
    if (!date) {
      return null;
    }
    var dd = date.getUTCDate();
    var mm = date.getUTCMonth() + 1;
    var yyyy = date.getUTCFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  updateProduct() {
    debugger;
    let dateProd = this.formatDate(new Date(this.productUPD.createdOn));
    const product = new Product();
    product.id = this.productUPD.id;
    product.nameProd = this.productUPD.nameProd;
    product.descProd = this.productUPD.descProd;
    product.price = this.productUPD.price;
    product.disccount = this.productUPD.disccount;
    product.createdOn = dateProd;

    this._apiService
    .updateProduct(product)
    .toPromise()
    .then(() => {
      this._router.navigate(['listProduct']);
    }).catch((err) => {
      console.log(err);
      if (err.status === 201 && err.statusText) {
        this._router.navigate(['listProduct']);
      }
    });
  }

  ngOnInit() {
  }

}
