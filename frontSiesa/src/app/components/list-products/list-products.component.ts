import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  User: string = 'Andres Tejada';
  products: any[] = [];

  constructor(
    private _apiService: ApiServiceService,
    private _router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this._apiService
      .getProduct()
      .subscribe((resp: any) => {
        resp.forEach(el => {
          el.createdOn = this.formatDate(new Date(el.createdOn));
          this.products.push(el);
        });
      });
  }

  formatDate(date) {
    if (!date) {
      return null;
    }
    var dd = date.getUTCDate();
    var mm = date.getUTCMonth() + 1;
    var yyyy = date.getUTCFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }

  openCreateProd() {
    debugger;
    // window.location.href = "createProduct"
    this._router.navigate(['createProduct']);
  }

  sortTable(n: any, type: string) {
    let table,
      rows,
      switching: boolean, i: number, x: { innerHTML: string; },
      y: any,
      shouldSwitch: boolean,
      dir: string,
      switchcount = 0;

    table = document.getElementById("sortable");
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if ((type == "str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if ((type == "str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  deleteProduct(id: any) {
    id = parseInt(id);
    this._apiService
    .deleteProduct(id)
    .toPromise()
    .then((delProd) => console.log(delProd))
    .catch((err) => console.log(err));
  }
  
  ngOnInit() {
  }

}
